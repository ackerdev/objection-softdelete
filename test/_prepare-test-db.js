'use strict';

const config = require('./_knexfile');
const schema = config.connection.database;
Reflect.deleteProperty(config.connection, 'database');

const knex = require('knex')(config);

knex.schema.raw(`DROP DATABASE IF EXISTS \`${schema}\``)
  .then(() => knex.schema.raw(`CREATE DATABASE IF NOT EXISTS \`${schema}\``))
  .then(() => knex.schema.withSchema(schema).dropTableIfExists('softdelete'))
  .then(() => knex.schema.withSchema(schema).createTable('softdelete', table => {
    table.increments();
    table.dateTime('deletedAt');
  }))
  .then(() => knex.schema.withSchema(schema).dropTableIfExists('harddelete'))
  .then(() => knex.schema.withSchema(schema).createTable('harddelete', table => {
    table.increments();
  }))
  .then(() => knex.schema.withSchema(schema).dropTableIfExists('relation'))
  .then(() => knex.schema.withSchema(schema).createTable('relation', table => {
    table.increments();
    table.integer('fk');
    table.dateTime('deletedAt');
  }))
  .then(() => knex.schema.withSchema(schema).dropTableIfExists('many_to_many_relation'))
  .then(() => knex.schema.withSchema(schema).createTable('many_to_many_relation', table => {
    table.increments();
  }))
  .then(() => knex.schema.withSchema(schema).dropTableIfExists('pivot'))
  .then(() => knex.schema.withSchema(schema).createTable('pivot', table => {
    table.integer('relationId');
    table.integer('softdeleteId');
    table.dateTime('deletedAt');
  }))
  .then(() => process.exit())
  .catch(error => {
    console.error(error);
    process.exit(1)
  });