const { Model } = require('./objection');

class SoftDeleteModel extends Model {
  static tableName = 'softdelete';
  static softDelete = true;
  static get relationMappings() {
    return {
      relationModel: {
        relation: Model.HasManyRelation,
        modelClass: RelationModel,
        join: {
          from: 'softdelete.id',
          to: 'relation.fk'
        }
      },
      manyToManyModel: {
        relation: Model.ManyToManyRelation,
        modelClass: ManyToManyRelationModel,
        join: {
          from: 'softdelete.id',
          to: 'many_to_many_relation.id',
          through: {
            from: 'pivot.softdeleteId',
            to: 'pivot.relationId'
          }
        }
      }
    };
  }
}

class HardDeleteModel extends Model {
  static tableName = 'harddelete';
}

class RelationModel extends Model {
  static tableName = 'relation';
  static softDelete = true;
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
        to: 'softdelete.id',
        through: {
          from: 'pivot.relationId',
          to: 'pivot.softdeleteId'
        }
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
