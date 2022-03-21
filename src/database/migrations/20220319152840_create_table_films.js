exports.up = function (knex) {
  return knex.schema.createTable("films", (table) => {
    table.increments("id");
    table.integer("exhibition_year");
    table.string("title");
    table.string("genre");
    table.string("nationality");
    table.string("distribution_company");
    table.string("origin_distributor_company");
    table.integer("public_exhibition_year");
    table.float("invoicing_exhibition_year");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("films");
};
