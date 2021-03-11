'use strict';

const test = require('ava');
const { SoftDeleteModel, RelationModel } = require('./helpers/models');

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({ deletedAt: new Date() });
  const related = await RelationModel.query().insert({ fk: target.id });
  t.context = { target, related };
});

test.afterEach.always(async t => {
  const { target, related } = t.context;
  await target.$query().forceDelete();
  await related.$query().delete();
});

test('static query', async t => {
  const { target } = t.context;
  const model = await SoftDeleteModel.query().findById(target.id);
  t.is(model, undefined);
});

test('related query', async t => {
  const { target, related } = t.context;
  const model = await related.$relatedQuery('softDeleteModel');
  t.is(model, undefined);
});

test('eager', async t => {
  const { target, related } = t.context;
  const relatedModel = await RelationModel.query().eager('softDeleteModel').findById(related.id);
  const model = relatedModel.softDeleteModel;
  t.is(model, null);
});

test('loadRelated', async t => {
  const { target, related } = t.context;
  const relatedModel = await related.$loadRelated('softDeleteModel');
  const model = relatedModel.softDeleteModel;
  t.is(model, null);
});

test('count', async t => {
  const { target } = t.context;
  const count = await SoftDeleteModel.query().where({ id: target.id }).resultSize();
  t.is(count, 0);
});
