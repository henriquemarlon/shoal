package campaign

import (
	"context"
	"fmt"

	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/internal/infra/repository"
	user "github.com/henriquemarlon/shoal/internal/usecase/user"
)

type FindCampaignByIdInputDTO struct {
	Id uint `json:"id" validate:"required"`
}

type FindCampaignByIdUseCase struct {
	UserRepository     repository.UserRepository
	CampaignRepository repository.CampaignRepository
}

func NewFindCampaignByIdUseCase(userRepository repository.UserRepository, campaignRepository repository.CampaignRepository) *FindCampaignByIdUseCase {
	return &FindCampaignByIdUseCase{UserRepository: userRepository, CampaignRepository: campaignRepository}
}

func (f *FindCampaignByIdUseCase) Execute(ctx context.Context, input *FindCampaignByIdInputDTO) (*CampaignOutputDTO, error) {
	res, err := f.CampaignRepository.FindCampaignById(ctx, input.Id)
	if err != nil {
		return nil, err
	}
	orders := make([]*entity.Order, len(res.Orders))
	for i, order := range res.Orders {
		orders[i] = &entity.Order{
			Id:                 order.Id,
			CampaignId:         order.CampaignId,
			BadgeChainSelector: order.BadgeChainSelector,
			Investor:           order.Investor,
			Amount:             order.Amount,
			InterestRate:       order.InterestRate,
			State:              order.State,
			CreatedAt:          order.CreatedAt,
			UpdatedAt:          order.UpdatedAt,
		}
	}
	creator, err := f.UserRepository.FindUserByAddress(ctx, res.Creator)
	if err != nil {
		return nil, fmt.Errorf("error finding creator: %w", err)
	}
	return &CampaignOutputDTO{
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
		Orders:            orders,
		CreatedAt:         res.CreatedAt,
		ClosesAt:          res.ClosesAt,
		MaturityAt:        res.MaturityAt,
		UpdatedAt:         res.UpdatedAt,
	}, nil
}
