'use strict'

const test = require('ava');
const { SoftDeleteModel, ManyToManyRelationModel } = require('./helpers/models');

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({ deletedAt: new Date() });
  const related = await ManyToManyRelationModel.query().insert({});
  await related.$relatedQuery('softDeleteModel').relate(target);
  t.context = { target, related };
});

test.afterEach.always(async t => {
  const { target, related } = t.context;
  await target.$query().forceDelete();
  await related.$query().delete();
});

test('uses unambiguous column reference', async t => {
  const { target, related } = t.context;
  const result = await ManyToManyRelationModel.query()
    .withGraphJoined('softDeleteModel')
    .where('many_to_many_relation.id', related.id);
  t.is(result.softDeleteModel, undefined);
});
