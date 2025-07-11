package user

import (
	"context"

	"github.com/henriquemarlon/shoal/internal/infra/repository"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
)

type DeleteUserInputDTO struct {
	Address custom_type.Address `json:"address" validate:"required"`
}

type DeleteUserUseCase struct {
	UserRepository repository.UserRepository
}

func NewDeleteUserUseCase(userRepository repository.UserRepository) *DeleteUserUseCase {
	return &DeleteUserUseCase{
		UserRepository: userRepository,
	}
}

func (u *DeleteUserUseCase) Execute(ctx context.Context, input *DeleteUserInputDTO) error {
	return u.UserRepository.DeleteUser(ctx, input.Address)
}
