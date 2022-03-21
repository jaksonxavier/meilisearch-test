const knex = require("./database");

class KnexFilmsRepository {
  async create(film) {
    await knex.table("films").insert(film);

    return;
  }

  async save({ id, params }) {
    await knex
      .table("films")
      .where({ id })
      .update({ ...params, updated_at: knex.fn.now() });

    return;
  }

  async findById(id) {
    const [film] = await knex.select().table("films").where({
      id,
    });

    return film;
  }

  async findByTitle({ title, limit, offset }) {
    const [data, [{ totalCount }]] = await Promise.all([
      knex
        .select()
        .table("films")
        .whereLike("title", `%${title}%`)
        .limit(limit)
        .offset(offset),
      knex
        .select()
        .table("films")
        .count("id", { as: "totalCount" })
        .whereLike("title", `%${title}%`),
    ]);

    return {
      data,
      totalCount,
    };
  }

  async findMany({ limit, offset }) {
    const [data, [{ totalCount }]] = await Promise.all([
      knex.select().table("films").limit(limit).offset(offset),
      knex.select().table("films").count("id", { as: "totalCount" }),
    ]);

    return {
      data,
      totalCount,
    };
  }

  async deleteById(id) {
    await knex.table("films").where({ id }).del();

    return;
  }
}

module.exports = new KnexFilmsRepository();
