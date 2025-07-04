package user

import (
	"github.com/henriquemarlon/shoal/pkg/custom_type"
	"github.com/holiman/uint256"
)

type WithdrawInputDTO struct {
	Token  custom_type.Address `json:"token" validate:"required"`
	Amount *uint256.Int        `json:"amount" validate:"required"`
}

type EmergencyERC20WithdrawInputDTO struct {
	To                       custom_type.Address `json:"to" validate:"required"`
	Token                    custom_type.Address `json:"token" validate:"required"`
	EmergencyWithdrawAddress custom_type.Address `json:"emergency_withdraw_address" validate:"required"`
}

type EmergencyEtherWithdrawInputDTO struct {
	To                       custom_type.Address `json:"to" validate:"required"`
	EmergencyWithdrawAddress custom_type.Address `json:"emergency_withdraw_address" validate:"required"`
}
