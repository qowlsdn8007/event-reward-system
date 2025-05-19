// infrastructure/repositories/user.repository.mongo.ts
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Role, User } from '../domain/user'
import { BaseRepository } from './base.mongodb.repository'

@Injectable()
export class MongoUserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource)
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOneBy({ username })
  }

  async findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } })
  }

  async saveUser(user: User): Promise<User> {
    return this.save(user)
  }
}
