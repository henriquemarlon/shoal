<br>
<p align="center">
    <img src="https://github.com/user-attachments/assets/d4dd04e4-8cbe-4095-aea4-56549c6e06d3" align="center" width="20%">
</p>
<br>

<div align="center">
    <i>A Linux-powered EVM rollup serving as a Debt Capital Market for the creator economy</i>
</div>
<div align="center">
<b>Tokenized debt issuance through reverse campaign mechanism with collateralization</b>
</div>
<br>
<p align="center">
	<img src="https://img.shields.io/github/license/henriquemarlon/shoal?style=default&logo=opensourceinitiative&logoColor=white&color=1E1E1E" alt="license">
	<img src="https://img.shields.io/github/last-commit/henriquemarlon/shoal?style=default&logo=git&logoColor=white&color=FF533F" alt="last-commit">
</p>

> [!CAUTION]
> This is an experimental project under continuous development and should be treated as such. **Its use in production/mainnet is not recommended.**

##  Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running](#running)
  - [Testing](#testing)
- [Deployment](#deployment)

##  Overview

A debt capital market platform designed for the creator economy, enabling content creators to monetize their influence by issuing tokenized debt instruments collateralized. Through a reverse campaign mechanism, the platform connects creators with investors, offering a structured and transparent alternative to finance scalable businesses while leveraging the economic potential of their audiences, ensuring legal compliance and attractive returns for investors.

## Architecture

> [!NOTE]
> The Shoal platform operates as a Cartesi Rollup that processes debt capital market operations through smart contracts. The system consists of:
>
> **1 - Campaign Management**: Creators can create campaigns with specific collateralization requirements, interest rates, and funding goals. The platform manages the lifecycle of these campaigns from creation to settlement.
>
> **2 - Order Processing**: Investors can place orders to participate in campaigns, specifying their investment amount and desired interest rate. The system matches orders based on campaign requirements and market conditions.
>
> **3 - Cross-Chain Integration**: The platform supports cross-chain operations through Chainlink CCIP, enabling seamless NFT transfers across different blockchain networks. This allows investors to choose which network they want to receive their badges on.
>
> **4 - Cartesi Rollup**: All business logic runs on a Linux-powered EVM rollup, providing scalability and cost efficiency while maintaining the security guarantees of the underlying blockchain.
>
> **5 - Collateral Management**: The system manages collateral tokens and ensures proper liquidation mechanisms are in place to protect investors while enabling creators to access capital.

##  Getting Started

###  Prerequisites

1. [Install Docker Desktop for your operating system](https://www.docker.com/products/docker-desktop/).

   To install Docker RISC-V support without using Docker Desktop, run the following command:
    
   ```shell
   docker run --privileged --rm tonistiigi/binfmt --install all
   ```

2. [Download and install the latest version of Node.js](https://nodejs.org/en/download).

3. Cartesi CLI is an easy-to-use tool to build and deploy your dApps on devnet. To install it, run:

   ```shell
   npm install -g @cartesi/cli@2.0.0-alpha.15
   ```

###  Running

1. Devnet mode:

   1.1 Build application:

   ```sh
   cartesi build
   ```

   1.2 Run application on devnet:

   ```sh
   cartesi run --epoch-lengh 60
   ```

2. Production mode:

### Testing

> [!TIP]
> Run tests to ensure all components are working correctly before proceeding with deployment.

```bash
make test
```

## Deployment

### Deploy contracts

> [!NOTE]
> Before deploying contracts, ensure you have sufficient testnet tokens for gas fees on both Sepolia and Arbitrum Sepolia networks.

Set up your environment variables:

```bash
## Please set SEPOLIA_RPC_URL on .env
SEPOLIA_RPC_URL=""

## Please set ARBITRUM_SEPOLIA_NETWORK on .env
ARBITRUM_SEPOLIA_RPC_URL=""

## Please set PRIVATE_KEY on .env 
PRIVATE_KEY=""
```

Deploy all contracts:

```bash
make contracts
```

> [!TIP]
> You can deploy specific contract sets individually for testing or development purposes.

Deploy specific contract sets:

```bash
make assets      # Deploy token contracts
make chainlink   # Deploy cross-chain contracts
make vlayer      # Deploy VLayer contracts
make delegatecall # Deploy delegatecall contracts
```

### Deploy the Cartesi Rollups Node

> [!WARNING]
> This section requires a Fly.io account and sufficient credits. Make sure you have set up your Fly.io CLI and authenticated before proceeding.

```bash
fly app create cartesinode
```

```bash
fly postgres create --initial-cluster-size 1 --name rollups-node-database --vm-size shared-cpu-1x --volume-size 1
```

```bash
fly postgres attach rollups-node-database -a rollups-node
```

> [!IMPORTANT]
> The following environment variables are crucial for the rollup node to function properly. Make sure to use valid endpoints and keep your mnemonic secure.

Set environment variables for the rollup node:

```bash
CARTESI_BLOCKCHAIN_HTTP_ENDPOINT=<web3-provider-http-endpoint>
CARTESI_BLOCKCHAIN_WS_ENDPOINT=<web3-provider-ws-endpoint>
CARTESI_AUTH_MNEMONIC=<mnemonic>
CARTESI_DATABASE_CONNECTION=<connection_string>
```

Deploy Cartesi Rollups Node:

```bash
fly deploy -a rollups-node
```

Access the project via ssh:

```bash
fly ssh console
```

Install required tools:

```bash
curl https://mise.run | sh
echo "eval \"\$(/root/.local/bin/mise activate bash)\"" >> ~/.bashrc
exec bash
```

```bash
mise use -g go@1.24.4
```

```bash
go install github.com/cartesi/rollups-node/cmd/cartesi-rollups-cli@85ee6814082bd668979f96fec7c01c816df29422
```

### Deploy and register your application to the Node

```bash
mkdir -p /var/lib/cartesi-rollups-node/snapshots/shoal
curl -L https://github.com/henriquemarlon/shoal/releases/download/v0.1.0/shoal-snapshot.tar.gz | tar -xz -C /var/lib/cartesi-rollups-node/snapshots/shoal
```


```bash
cartesi-rollups-cli deploy application shoal /var/lib/cartesi-rollups-node/snapshots/image --epoch-length 516
```

Output:

```bash
Deploying application: shoal...success

application address: 0x195A6053c6aDC27f9720549cF00B0e576D8Dc312
consensus address: 0x08F3e119e458cE4E3f022CEE8C8F57d418d5e1Df

Registering application: shoal...success
```

### Setup application ownership

> [!NOTE]
> This step is required to link the deployed contracts with your Cartesi Rollups application. Make sure you have the application address ready from the previous deployment step.

Transfer ownership of the deployed SourceMinter contract to the shoal application address:

```bash
make setup
```

When prompted, enter the application address previously deployed.

Output:

```bash
======================= START OF LOG =======================
[⠊] Compiling...
[⠑] Compiling 90 files with Solc 0.8.28
[⠃] Solc 0.8.28 finished in 697.30ms
Compiler run successful!
Enter application address: 
```
