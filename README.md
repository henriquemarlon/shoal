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

Secrets:

refer:

https://fly.io/docs/apps/secrets/