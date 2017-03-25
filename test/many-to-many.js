'use strict'

import test from 'ava';
import { SoftDeleteModel, ManyToManyRelationModel } from './helpers/models';

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({ deletedAt: new Date() });
  const related = await ManyToManyRelationModel.query().insert({});
  await related.$relatedQuery('softDeleteModel').relate(target);
  t.context = { target, related };
});

test.afterEach.always(async t => {
  const { target, related } = t.context;
  target.$query().forceDelete();
  related.$query().delete();
});

test('uses unambiguous column reference', async t => {
  const { target, related } = t.context;
  const result = await ManyToManyRelationModel.query()
    .debug()
    .where({ id: related.id })
    .eager('softDeleteModel');
  t.is(result.softDeleteModel, undefined);
});
