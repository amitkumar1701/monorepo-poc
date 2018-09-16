const config = require("config");

const { dbConfig } = config.roofgraf;

const knex = require("knex")(dbConfig);
const bookshelf = require("bookshelf")(knex);

bookshelf.plugin("registry");

module.exports = bookshelf;
