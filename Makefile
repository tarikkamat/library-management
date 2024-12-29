start:
	docker compose -f docker/docker-compose.yml up --build -d

stop:
	docker compose -f docker/docker-compose.yml down

migrate:
	docker compose -f docker/docker-compose.yml exec app npx sequelize db:migrate

seed:
	docker compose -f docker/docker-compose.yml exec app npx sequelize db:seed:all

clean:
	docker compose -f docker/docker-compose.yml down -v
	docker system prune -f
	docker volume prune -f

logs:
	docker compose -f docker/docker-compose.yml logs -f

rebuild:
	docker compose -f docker/docker-compose.yml down -v
	docker compose -f docker/docker-compose.yml up --build