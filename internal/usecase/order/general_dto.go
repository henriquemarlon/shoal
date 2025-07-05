package order

import (
	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/holiman/uint256"
)

type FindOrderOutputDTO struct {
	Id                 uint         `json:"id"`
	CampaignId         uint         `json:"campaign_id"`
	BadgeChainSelector *uint256.Int `json:"badge_chain_selector"`
	Investor           *entity.User `json:"investor"`
	Amount             *uint256.Int `json:"amount"`
	InterestRate       *uint256.Int `json:"interest_rate"`
	State              string       `json:"state"`
	CreatedAt          int64        `json:"created_at"`
	UpdatedAt          int64        `json:"updated_at"`
}
