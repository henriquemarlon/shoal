package main

import (
	"os"

	"github.com/henriquemarlon/shoal/cmd/shoal-rollup/root"
)

func main() {
	err := root.Cmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}
