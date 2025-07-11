package social_account

import (
	"context"

	"github.com/henriquemarlon/shoal/internal/infra/repository"
)

type FindSocialAccountByIdInputDTO struct {
	SocialAccountId uint `json:"social_account_id" validate:"required"`
}

type FindSocialAccountByIdUseCase struct {
	SocialAccountRepository repository.SocialAccountRepository
}

func NewFindSocialAccountByIdUseCase(socialAccountRepository repository.SocialAccountRepository) *FindSocialAccountByIdUseCase {
	return &FindSocialAccountByIdUseCase{
		SocialAccountRepository: socialAccountRepository,
	}
}

func (s *FindSocialAccountByIdUseCase) Execute(ctx context.Context, input *FindSocialAccountByIdInputDTO) (*SocialAccountOutputDTO, error) {
	socialAccount, err := s.SocialAccountRepository.FindSocialAccountById(ctx, input.SocialAccountId)
	if err != nil {
		return nil, err
	}
	return &SocialAccountOutputDTO{
		Id:        socialAccount.Id,
		UserId:    socialAccount.UserId,
		Username:  socialAccount.Username,
		Platform:  string(socialAccount.Platform),
		CreatedAt: socialAccount.CreatedAt,
		UpdatedAt: socialAccount.UpdatedAt,
	}, nil
}
