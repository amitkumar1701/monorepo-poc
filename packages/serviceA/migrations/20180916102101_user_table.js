/* eslint-disable max-statements */
exports.up = knex =>
  knex.schema.createTableIfNotExists("user", table => {
    table.increments("id").primary();
    table.string("username", 50);
    table.string("password", 200);
    table.string("first_name", 25);
    table.string("last_name", 25);
    table.string("role", 50);
    table.boolean("newsletter").defaultTo(0);
    table.string("email", 100)
    table.string("phone", 11).defaultTo(null);
    table.integer("address").unsigned();
    table.dateTime("last_login_date");
    table.string("persist_hash", 100);
    table.boolean("disabled");
    table.timestamps();
  });

exports.down = knex => knex.schema.dropTable("user");
