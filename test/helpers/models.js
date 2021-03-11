const { Model } = require('./objection');

class SoftDeleteModel extends Model {
  static tableName = 'softdelete';
  static softDelete = true;
}

class HardDeleteModel extends Model {
  static tableName = 'harddelete';
}

class RelationModel extends Model {
  static tableName = 'relation';
  static relationMappings = {
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

class ManyToManyRelationModel extends Model {
  static tableName = 'many_to_many_relation'
  static relationMappings = {
    softDeleteModel: {
      relation: Model.ManyToManyRelation,
      modelClass: SoftDeleteModel,
      join: {
        from: 'many_to_many_relation.id',
        through: {
          from: 'pivot.relationId',
          to: 'pivot.softdeleteId'
        },
        to: 'softdelete.id'
      }
    }
  };
}

module.exports = {
  SoftDeleteModel,
  HardDeleteModel,
  RelationModel,
  ManyToManyRelationModel
};
