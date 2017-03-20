const knex = require('knex')(require('../_knexfile'));
const objection = require('objection');
const objectionSoftDelete = require('../../');
objection.Model.knex(knex);
objectionSoftDelete.register(objection);

module.exports = objection;
