If you need to re-run the SQL initialization on an existing database, you can:
 
1. Stop the container (`docker-compose down`).
2. Remove the db-data volume (`docker volume rm api-server-data`).
3. Restart the container (`docker-compose up`).

This process will reinitialize the database from scratch with init.sql.