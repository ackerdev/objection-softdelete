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
  const model = await SoftDeleteModel.query().includeDeleted().findById(target.id);
  t.not(model, undefined);
});

test('related query', async t => {
  const { target, related } = t.context;
  const model = await related.$relatedQuery('softDeleteModel').includeDeleted();
  t.not(model, undefined);
});

test('withGraphFetched', async t => {
  const { target, related } = t.context;
  const relatedModel = await RelationModel.query().withGraphFetched('softDeleteModel').includeDeleted().findById(related.id);
  const model = relatedModel.softDeleteModel;
  t.not(model, null);
});

test('withGraphJoined', async t => {
  const { target, related } = t.context;
  const relatedModel = await RelationModel.query().withGraphJoined('softDeleteModel').includeDeleted().findById(related.id);
  const model = relatedModel.softDeleteModel;
  t.not(model, null);
});

test('fetchGraph', async t => {
  const { target, related } = t.context;
  const relatedModel = await related.$fetchGraph('softDeleteModel').includeDeleted();
  const model = relatedModel.softDeleteModel;
  t.not(model, null);
});

test('count', async t => {
  const { target } = t.context;
  const count = await SoftDeleteModel.query().where({ id: target.id }).includeDeleted().resultSize();
  t.is(count, 1);
});
