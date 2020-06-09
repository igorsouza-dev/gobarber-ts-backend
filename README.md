# GoBarber Backend

## Setup Postgres using docker

```
# download docker image
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# show all images
docker ps -a


# start docker image
docker start gostack_postgres


# stop docker image
docker stop gostack_postgres
```

## TypeORM cli commands

```
# Create migration
yarn typeorm migration:create -n MigrationName

# Run migrations
yarn typeorm migration:run
```
