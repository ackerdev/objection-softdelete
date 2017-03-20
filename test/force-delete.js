'use strict';

import test from 'ava';
import { SoftDeleteModel, RelationModel } from './helpers/models';

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({});
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
  await SoftDeleteModel.query().where({ id: target.id }).forceDelete();
  const model = await SoftDeleteModel.knexQuery().where({ id: target.id }).first();
  t.is(model, undefined);
});

test('instance query', async t => {
  const { target } = t.context;
  await target.$query().forceDelete();
  const model = await SoftDeleteModel.knexQuery().where({ id: target.id }).first();
  t.is(model, undefined);
});

test('related query', async t => {
  const { target, related } = t.context;
  await related.$relatedQuery('softDeleteModel').forceDelete();
  const model = await SoftDeleteModel.knexQuery().where({ id: target.id }).first();
  t.is(model, undefined);
});
