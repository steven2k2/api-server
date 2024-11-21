docker-compose down
docker volume rm api-server_pg_data


docker-compose up -d


docker exec -it <postgres-container-name> psql -U myuser -c "\l"