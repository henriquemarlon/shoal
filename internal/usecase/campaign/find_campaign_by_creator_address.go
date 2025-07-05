package campaign

import (
	"context"
	"fmt"

	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/internal/infra/repository"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
)

type FindCampaignsByCreatorAddressInputDTO struct {
	CreatorAddress custom_type.Address `json:"creator_address" validate:"required"`
}

type FindCampaignsByCreatorAddressOutputDTO []*FindCampaignOutputDTO

type FindCampaignsByCreatorAddressUseCase struct {
	UserRepository     repository.UserRepository
	CampaignRepository repository.CampaignRepository
}

func NewFindCampaignsByCreatorAddressUseCase(userRepository repository.UserRepository, campaignRepository repository.CampaignRepository) *FindCampaignsByCreatorAddressUseCase {
	return &FindCampaignsByCreatorAddressUseCase{UserRepository: userRepository, CampaignRepository: campaignRepository}
}

func (f *FindCampaignsByCreatorAddressUseCase) Execute(ctx context.Context, input *FindCampaignsByCreatorAddressInputDTO) (*FindCampaignsByCreatorAddressOutputDTO, error) {
	res, err := f.CampaignRepository.FindCampaignsByCreatorAddress(ctx, input.CreatorAddress)
	if err != nil {
		return nil, err
	}
	output := make(FindCampaignsByCreatorAddressOutputDTO, len(res))
	for i, Campaign := range res {
		orders := make([]*entity.Order, len(Campaign.Orders))
		for j, order := range Campaign.Orders {
			orders[j] = &entity.Order{
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
		creator, err := f.UserRepository.FindUserByAddress(ctx, Campaign.Creator)
		if err != nil {
			return nil, fmt.Errorf("error finding creator: %w", err)
		}
		output[i] = &FindCampaignOutputDTO{
			Id:                Campaign.Id,
			Title:             Campaign.Title,
			Description:       Campaign.Description,
			Promotion:         Campaign.Promotion,
			Token:             Campaign.Token,
			Creator:           creator,
			CollateralAddress: Campaign.CollateralAddress,
			CollateralAmount:  Campaign.CollateralAmount,
			BadgeRouter:       Campaign.BadgeRouter,
			BadgeMinter:       Campaign.BadgeMinter,
			DebtIssued:        Campaign.DebtIssued,
			MaxInterestRate:   Campaign.MaxInterestRate,
			TotalObligation:   Campaign.TotalObligation,
			TotalRaised:       Campaign.TotalRaised,
			State:             string(Campaign.State),
			Orders:            orders,
			CreatedAt:         Campaign.CreatedAt,
			ClosesAt:          Campaign.ClosesAt,
			MaturityAt:        Campaign.MaturityAt,
			UpdatedAt:         Campaign.UpdatedAt,
		}
	}
	return &output, nil
}
