const { Model } = require('./objection');

class SoftDeleteModel extends Model {
  static get tableName() {
    return 'softdelete';
  }

  static get softDelete() {
    return true;
  }
}

class HardDeleteModel extends Model {
  static get tableName() {
    return 'harddelete';
  }
}

class RelationModel extends Model {
  static get tableName() {
    return 'relation'
  }

  static get relationMappings() {
    return {
      softDeleteModel: {
        relation: Model.BelongsToOneRelation,
        modelClass: SoftDeleteModel,
        join: {
          from: 'relation.fk',
          to: 'softdelete.id'
        }
      }
    };
  }
}

module.exports = {
  SoftDeleteModel,
  HardDeleteModel,
  RelationModel
};
