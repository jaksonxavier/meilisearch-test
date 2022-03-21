docker-compose up -d
npx knex migrate:latest
npm run seed
npm run start:dev