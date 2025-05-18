import {
  CreateDateColumn,
  DeleteDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Props } from '../props'

export abstract class BaseMongodbEntity {
  @ObjectIdColumn()
  private _id: ObjectId

  @CreateDateColumn()
  private _createdAt: Date

  @UpdateDateColumn()
  private _updatedAt: Date

  @DeleteDateColumn()
  private _deletedAt?: Date

  constructor(props: unknown) {
    Object.assign(this, props)
  }

  get internalId(): ObjectId {
    return this._id
  }

  get internalCreatedAt(): Date {
    return this._createdAt
  }

  get internalUpdatedAt(): Date {
    return this._updatedAt
  }

  get internalDeletedAt(): Date | undefined {
    return this._deletedAt
  }
}

export type NonBaseProps<E> = Omit<Props<E>, keyof BaseMongodbEntity>
