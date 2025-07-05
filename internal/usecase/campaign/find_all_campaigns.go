package campaign

import (
	"context"
	"fmt"

	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/internal/infra/repository"
)

type FindAllCampaignsOutputDTO []*FindCampaignOutputDTO

type FindAllCampaignsUseCase struct {
	UserRepository     repository.UserRepository
	CampaignRepository repository.CampaignRepository
}

func NewFindAllCampaignsUseCase(userRepository repository.UserRepository, campaignRepository repository.CampaignRepository) *FindAllCampaignsUseCase {
	return &FindAllCampaignsUseCase{UserRepository: userRepository, CampaignRepository: campaignRepository}
}

func (f *FindAllCampaignsUseCase) Execute(ctx context.Context) (*FindAllCampaignsOutputDTO, error) {
	res, err := f.CampaignRepository.FindAllCampaigns(ctx)
	if err != nil {
		return nil, err
	}
	output := make(FindAllCampaignsOutputDTO, len(res))
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
		output[i] = &FindCampaignOutputDTO{
			Id:                campaign.Id,
			Title:             campaign.Title,
			Description:       campaign.Description,
			Promotion:         campaign.Promotion,
			Token:             campaign.Token,
			Creator:           creator,
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
