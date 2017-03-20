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
