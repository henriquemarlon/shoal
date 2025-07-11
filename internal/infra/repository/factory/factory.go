package factory

import (
	"fmt"
	"strings"

	. "github.com/henriquemarlon/shoal/internal/infra/repository"
	"github.com/henriquemarlon/shoal/internal/infra/repository/sqlite"
)

func NewRepositoryFromConnectionString(conn string) (Repository, error) {
	lowerConn := strings.ToLower(conn)
	switch {
	case strings.HasPrefix(lowerConn, "sqlite://"):
		return newSQLiteRepository(conn)
	default:
		return nil, fmt.Errorf("unrecognized connection string format: %s", conn)
	}
}

func newSQLiteRepository(conn string) (Repository, error) {
	sqliteRepo, err := sqlite.NewSQLiteRepository(conn)
	if err != nil {
		return nil, err
	}

	return sqliteRepo, nil
}
