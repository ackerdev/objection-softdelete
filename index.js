'use strict';

module.exports = {
  register(objection, options = {}) {
    const {
      deleteAttr = 'deletedAt'
    } = options;

    class SoftDeleteQueryBuilder extends objection.QueryBuilder {
      constructor(modelClass) {
        super(modelClass)


        if (modelClass.softDelete) {
          this.onBuild(q => {
            if (q.isFind() && !q.context().includeDeleted) {
              q.whereNull(`${q.tableRefFor(modelClass)}.${deleteAttr}`);
            }
          });
        }
      }

      includeDeleted() {
        return this.context({ includeDeleted: true });
      }

      delete(...args) {
        if (this.modelClass().softDelete) {
          return super.whereNull(deleteAttr).patch({ [deleteAttr]: new Date() });
        }

        return super.delete(...args);
      }

      forceDelete(...args) {
        return super.delete(...args);
      }
    }

    objection.QueryBuilder = SoftDeleteQueryBuilder;
    objection.Model.QueryBuilder = SoftDeleteQueryBuilder;
    objection.Model.RelatedQueryBuilder = SoftDeleteQueryBuilder;
  }
};
