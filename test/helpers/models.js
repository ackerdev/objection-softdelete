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

class ManyToManyRelationModel extends Model {
  static get tableName() {
    return 'many_to_many_relation'
  }

  static get relationMappings() {
    return {
      softDeleteModel: {
        relation: Model.ManyToManyRelation,
        modelClass: SoftDeleteModel,
        join: {
          from: 'many_to_many_relation.fk',
          through: {
            from: 'pivot.relationId',
            to: 'pivot.softdeleteId'
          },
          to: 'softdelete.id'
        }
      }
    };
  }
}

module.exports = {
  SoftDeleteModel,
  HardDeleteModel,
  RelationModel,
  ManyToManyRelationModel
};
