const config = require("config");

const { dbConfig } = config.serviceA;

const knex = require("knex")(dbConfig);
const bookshelf = require("bookshelf")(knex);

bookshelf.plugin("registry");

module.exports = bookshelf;
