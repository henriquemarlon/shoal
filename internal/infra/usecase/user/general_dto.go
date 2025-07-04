package user

import (
	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
	"github.com/holiman/uint256"
)

type BalanceOfInputDTO struct {
	Token   custom_type.Address `json:"token"`
	Address custom_type.Address `json:"address" validate:"required"`
}

type FindUserOutputDTO struct {
	Id              uint                    `json:"id"`
	Role            string                  `json:"role"`
	Address         custom_type.Address     `json:"address"`
	SocialAccounts  []*entity.SocialAccount `json:"social_accounts"`
	InvestmentLimit *uint256.Int            `json:"investment_limit,omitempty" gorm:"type:bigint"`
	CreatedAt       int64                   `json:"created_at"`
	UpdatedAt       int64                   `json:"updated_at"`
}
