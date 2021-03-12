'use strict';

const test = require('ava');
const { SoftDeleteModel, RelationModel } = require('./helpers/models');

test.beforeEach(async t => {
  const target = await SoftDeleteModel.query().insert({});
  const related = await RelationModel.query().insert({ fk: target.id });
  t.context = { target, related };
});

test.afterEach.always(async t => {
  const { target } = t.context;
  await target.$query().forceDelete();
});

test('soft delete', async t => {
  const { target } = t.context;
  await target.$query().delete();
  t.is(await SoftDeleteModel.query().where({ id: target.id }).first(), undefined);
  const raw_result = await SoftDeleteModel.knexQuery().where({ id: target.id }).first();
  t.assert(raw_result.deletedAt);
});

test('query.delete() ignores deleted records', async t => {
  const { target } = t.context;
  const yesterday = get_yesterdays_date();
  const { deletedAt: before } = await target.$query().includeDeleted().patchAndFetch({ deletedAt: yesterday });
  await target.$query().delete();
  await SoftDeleteModel.query().delete();
  const { deletedAt: after } = await target.$query().includeDeleted();
  t.deepEqual(before, after);
})

test('relatedQuery.delete() ignores deleted records', async t => {
  const { related } = t.context;
  const yesterday = get_yesterdays_date();
  const { deletedAt: before } = await related.$query().includeDeleted().patchAndFetch({ deletedAt: yesterday });
  await SoftDeleteModel.relatedQuery('relationModel').delete();
  const { deletedAt: after } = await related.$query().includeDeleted();
  t.deepEqual(before, after);
})

function get_yesterdays_date() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}