module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/src/database/db.sqlite3`,
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
    useNullAsDefault: true,
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
