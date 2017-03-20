'use strict';

import test from 'ava';
import { SoftDeleteModel, RelationModel } from './helpers/models';

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({ deletedAt: new Date() });
  const related = await RelationModel.query().insert({ fk: target.id });
  t.context = { target, related };
});

test.afterEach.always(async t => {
  const { target, related } = t.context;
  target.$query().forceDelete();
  related.$query().delete();
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

test('eager', async t => {
  const { target, related } = t.context;
  const relatedModel = await RelationModel.query().eager('softDeleteModel').includeDeleted().findById(related.id);
  const model = relatedModel.softDeleteModel;
  t.not(model, null);
});

test('loadRelated', async t => {
  const { target, related } = t.context;
  const relatedModel = await related.$loadRelated('softDeleteModel').includeDeleted();
  const model = relatedModel.softDeleteModel;
  t.not(model, null);
});

test('count', async t => {
  const { target } = t.context;
  const count = await SoftDeleteModel.query().where({ id: target.id }).includeDeleted().resultSize();
  t.is(count, 1);
 });
