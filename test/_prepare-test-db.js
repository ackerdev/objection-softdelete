'use strict';

const config = require('./_knexfile');
const schema = config.connection.database;
Reflect.deleteProperty(config.connection, 'database');

const knex = require('knex')(config);

knex.schema.raw(`DROP DATABASE IF EXISTS \`${schema}\``)
.then(() => knex.schema.raw(`CREATE DATABASE \`${schema}\``))
.then(() => Promise.all([
  knex.schema.withSchema(schema).createTable('softdelete', table => {
    table.increments();
    table.dateTime('deletedAt');
  }),
  knex.schema.withSchema(schema).createTable('harddelete', table => {
    table.increments();
  }),
  knex.schema.withSchema(schema).createTable('relation', table => {
    table.increments();
    table.integer('fk');
  }),
  knex.schema.withSchema(schema).createTable('many_to_many_relation', table => {
    table.increments();
  }),
  knex.schema.withSchema(schema).createTable('pivot', table => {
    table.integer('relationId');
    table.integer('softdeleteId');
    table.dateTime('deletedAt');
  })
]))
.then(() => process.exit())
.catch(error => {
  console.error(error);
  process.exit(1)
});
