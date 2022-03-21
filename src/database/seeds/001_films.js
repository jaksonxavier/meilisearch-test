const films = require("../dataset.json");

exports.seed = async function (knex) {
  await knex("films").del();
  await knex("films").insert(films);
};
