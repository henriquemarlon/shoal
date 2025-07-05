# shoal

Deploy

```bash
fly app create <app-name>
```

```bash
fly postgres create --initial-cluster-size 1 --name <app-name>-database --vm-size shared-cpu-1x --volume-size 1
```

```bash
fly postgres attach <app-name>-database -a <app-name>
```

```bash
fly secrets set -a <app-name> CARTESI_BLOCKCHAIN_HTTP_ENDPOINT=<web3-provider-http-endpoint>
fly secrets set -a <app-name> CARTESI_BLOCKCHAIN_WS_ENDPOINT=<web3-provider-ws-endpoint>
fly secrets set -a <app-name> CARTESI_AUTH_MNEMONIC=`<mnemonic>`
fly secrets set -a <app-name> CARTESI_DATABASE_CONNECTION=<connection_string>
```

- [ ] Deployar os contratos;
- [ ] Proper release;
- [ ] README.md;
- [ ] Registar aplicação;