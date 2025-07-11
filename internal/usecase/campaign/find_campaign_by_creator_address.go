package campaign

import (
	"context"
	"fmt"

	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/internal/infra/repository"
	"github.com/henriquemarlon/shoal/internal/usecase/user"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
)

type FindCampaignsByCreatorAddressInputDTO struct {
	CreatorAddress custom_type.Address `json:"creator_address" validate:"required"`
}

type FindCampaignsByCreatorAddressOutputDTO []*CampaignOutputDTO

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
	for i, campaign := range res {
		orders := make([]*entity.Order, len(campaign.Orders))
		for j, order := range campaign.Orders {
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
		creator, err := f.UserRepository.FindUserByAddress(ctx, campaign.Creator)
		if err != nil {
			return nil, fmt.Errorf("error finding creator: %w", err)
		}
		output[i] = &CampaignOutputDTO{
			Id:          campaign.Id,
			Title:       campaign.Title,
			Description: campaign.Description,
			Promotion:   campaign.Promotion,
			Token:       campaign.Token,
			Creator: &user.UserOutputDTO{
				Id:             creator.Id,
				Role:           string(creator.Role),
				Address:        creator.Address,
				SocialAccounts: creator.SocialAccounts,
				CreatedAt:      creator.CreatedAt,
				UpdatedAt:      creator.UpdatedAt,
			},
			CollateralAddress: campaign.CollateralAddress,
			CollateralAmount:  campaign.CollateralAmount,
			BadgeRouter:       campaign.BadgeRouter,
			BadgeMinter:       campaign.BadgeMinter,
			DebtIssued:        campaign.DebtIssued,
			MaxInterestRate:   campaign.MaxInterestRate,
			TotalObligation:   campaign.TotalObligation,
			TotalRaised:       campaign.TotalRaised,
			State:             string(campaign.State),
			Orders:            orders,
			CreatedAt:         campaign.CreatedAt,
			ClosesAt:          campaign.ClosesAt,
			MaturityAt:        campaign.MaturityAt,
			UpdatedAt:         campaign.UpdatedAt,
		}
	}
	return &output, nil
}
