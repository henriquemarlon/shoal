package campaign

import (
	"context"
	"fmt"

	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/internal/infra/repository"
	"github.com/henriquemarlon/shoal/internal/usecase/user"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
	"github.com/holiman/uint256"
	"github.com/rollmelette/rollmelette"
)

type ExecuteCampaignCollateralInputDTO struct {
	Id uint `json:"id" validate:"required"`
}

type ExecuteCampaignCollateralOutputDTO struct {
	Id                uint                `json:"id"`
	Title             string              `json:"title,omitempty"`
	Description       string              `json:"description,omitempty"`
	Promotion         string              `json:"promotion,omitempty"`
	Token             custom_type.Address `json:"token"`
	Creator           *user.UserOutputDTO `json:"creator"`
	CollateralAddress custom_type.Address `json:"collateral_address"`
	CollateralAmount  *uint256.Int        `json:"collateral_amount"`
	BadgeRouter       custom_type.Address `json:"badge_router"`
	BadgeMinter       custom_type.Address `json:"badge_minter"`
	DebtIssued        *uint256.Int        `json:"debt_issued"`
	MaxInterestRate   *uint256.Int        `json:"max_interest_rate"`
	TotalObligation   *uint256.Int        `json:"total_obligation"`
	TotalRaised       *uint256.Int        `json:"total_raised"`
	State             string              `json:"state"`
	Orders            []*entity.Order     `json:"orders"`
	CreatedAt         int64               `json:"created_at"`
	ClosesAt          int64               `json:"closes_at"`
	MaturityAt        int64               `json:"maturity_at"`
	UpdatedAt         int64               `json:"updated_at"`
}

type ExecuteCampaignCollateralUseCase struct {
	UserRepository     repository.UserRepository
	CampaignRepository repository.CampaignRepository
	OrderRepository    repository.OrderRepository
}

func NewExecuteCampaignCollateralUseCase(userRepository repository.UserRepository, campaignRepository repository.CampaignRepository, orderRepository repository.OrderRepository) *ExecuteCampaignCollateralUseCase {
	return &ExecuteCampaignCollateralUseCase{
		UserRepository:     userRepository,
		CampaignRepository: campaignRepository,
		OrderRepository:    orderRepository,
	}
}

func (uc *ExecuteCampaignCollateralUseCase) Execute(ctx context.Context, input *ExecuteCampaignCollateralInputDTO, metadata rollmelette.Metadata) (*ExecuteCampaignCollateralOutputDTO, error) {
	campaign, err := uc.CampaignRepository.FindCampaignById(ctx, input.Id)
	if err != nil {
		return nil, err
	}

	if err := uc.Validate(campaign, metadata); err != nil {
		return nil, err
	}

	var ordersToUpdate []*entity.Order
	for _, order := range campaign.Orders {
		if order.State == entity.OrderStateAccepted || order.State == entity.OrderStatePartiallyAccepted {
			order.State = entity.OrderStateSettledByCollateral
			order.UpdatedAt = metadata.BlockTimestamp
			ordersToUpdate = append(ordersToUpdate, order)
		}
	}
	for _, order := range ordersToUpdate {
		if _, err := uc.OrderRepository.UpdateOrder(ctx, order); err != nil {
			return nil, fmt.Errorf("error updating order: %w", err)
		}
	}

	campaign.State = entity.CampaignStateCollateralExecuted

	res, err := uc.CampaignRepository.UpdateCampaign(ctx, campaign)
	if err != nil {
		return nil, err
	}

	creator, err := uc.UserRepository.FindUserByAddress(ctx, res.Creator)
	if err != nil {
		return nil, fmt.Errorf("error finding creator: %w", err)
	}

	return &ExecuteCampaignCollateralOutputDTO{
		Id:          res.Id,
		Title:       res.Title,
		Description: res.Description,
		Promotion:   res.Promotion,
		Token:       res.Token,
		Creator: &user.UserOutputDTO{
			Id:             creator.Id,
			Role:           string(creator.Role),
			Address:        creator.Address,
			SocialAccounts: creator.SocialAccounts,
			CreatedAt:      creator.CreatedAt,
			UpdatedAt:      creator.UpdatedAt,
		},
		CollateralAddress: res.CollateralAddress,
		CollateralAmount:  res.CollateralAmount,
		BadgeRouter:       res.BadgeRouter,
		BadgeMinter:       res.BadgeMinter,
		DebtIssued:        res.DebtIssued,
		MaxInterestRate:   res.MaxInterestRate,
		TotalObligation:   res.TotalObligation,
		TotalRaised:       res.TotalRaised,
		State:             string(res.State),
		Orders:            res.Orders,
		CreatedAt:         res.CreatedAt,
		ClosesAt:          res.ClosesAt,
		MaturityAt:        res.MaturityAt,
		UpdatedAt:         res.UpdatedAt,
	}, nil
}

func (uc *ExecuteCampaignCollateralUseCase) Validate(campaign *entity.Campaign, metadata rollmelette.Metadata) error {
	if metadata.BlockTimestamp < campaign.MaturityAt {
		return fmt.Errorf("the maturity date of the campaign campaign has not passed")
	}
	if campaign.State != entity.CampaignStateClosed {
		return fmt.Errorf("campaign campaign not closed")
	}
	return nil
}
