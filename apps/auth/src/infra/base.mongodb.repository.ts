import { DataSource, EntityTarget, MongoRepository } from 'typeorm'

import { BaseMongodbEntity } from './base.mongodb.entity'

export abstract class BaseRepository<
  T extends BaseMongodbEntity,
> extends MongoRepository<T> {
  constructor(E: EntityTarget<T>, dataSource: DataSource) {
    super(E, dataSource.createEntityManager())
  }
}
