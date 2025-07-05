package sqlite

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/henriquemarlon/shoal/configs"
	"github.com/henriquemarlon/shoal/internal/domain/entity"
	"github.com/henriquemarlon/shoal/pkg/custom_type"
)

type SQLiteRepository struct {
	Db *gorm.DB
}

func (r *SQLiteRepository) Close() error {
	sqlDB, err := r.Db.DB()
	if err != nil {
		return fmt.Errorf("failed to get database instance: %w", err)
	}
	return sqlDB.Close()
}

func NewSQLiteRepository(conn string) (*SQLiteRepository, error) {
	dbPath := strings.TrimPrefix(conn, "sqlite://")

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(
		&entity.Campaign{},
		&entity.Order{},
		&entity.User{},
		&entity.SocialAccount{},
	)
	if err != nil {
		return nil, err
	}

	// Set defaults before trying to get the values
	configs.SetDefaults()

	var adminAddress string
	var verifierAddress string

	// Use test addresses for in-memory database (test only)
	if dbPath == ":memory:" {
		adminAddr, err := configs.GetShoalAdminAddressTest()
		if err != nil {
			return nil, fmt.Errorf("failed to get SHOAL_ADMIN_ADDRESS_TEST: %w", err)
		}
		adminAddress = adminAddr.Hex()

		verifierAddr, err := configs.GetShoalVerifierAddressTest()
		if err != nil {
			return nil, fmt.Errorf("failed to get SHOAL_VERIFIER_ADDRESS_TEST: %w", err)
		}
		verifierAddress = verifierAddr.Hex()
	} else {
		adminAddr, err := configs.GetShoalAdminAddress()
		if err != nil {
			return nil, fmt.Errorf("failed to get SHOAL_ADMIN_ADDRESS: %w", err)
		}
		adminAddress = adminAddr.Hex()

		verifierAddr, err := configs.GetShoalVerifierAddress()
		if err != nil {
			return nil, fmt.Errorf("failed to get SHOAL_VERIFIER_ADDRESS: %w", err)
		}
		verifierAddress = verifierAddr.Hex()
	}

	adminUser := entity.User{
		Role:      entity.UserRoleAdmin,
		Address:   custom_type.HexToAddress(adminAddress),
		CreatedAt: time.Now().Unix(),
	}

	verifierUser := entity.User{
		Role:      entity.UserRoleVerifier,
		Address:   custom_type.HexToAddress(verifierAddress),
		CreatedAt: time.Now().Unix(),
	}

	if err := db.Create(&adminUser).Error; err != nil {
		return nil, fmt.Errorf("failed to create admin user: %w", err)
	}

	if err := db.Create(&verifierUser).Error; err != nil {
		return nil, fmt.Errorf("failed to create verifier user: %w", err)
	}

	return &SQLiteRepository{Db: db}, nil
}
