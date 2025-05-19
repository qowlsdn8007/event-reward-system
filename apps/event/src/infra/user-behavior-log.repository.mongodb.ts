import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseRepository } from './base.mongodb.repository'
import { UserBehaviorLog, BehaviorType } from '../domain/user-behavior-log'
import { IUserBehaviorLogRepository } from '../domain/user-behavior-log.repository.interface'

@Injectable()
export class MongoUserBehaviorLogRepository
  extends BaseRepository<UserBehaviorLog>
  implements IUserBehaviorLogRepository
{
  constructor(dataSource: DataSource) {
    super(UserBehaviorLog, dataSource)
  }

  saveLog(log: UserBehaviorLog): Promise<UserBehaviorLog> {
    return this.save(log)
  }

  findByUser(userId: string): Promise<UserBehaviorLog[]> {
    return this.findBy({ userId })
  }

  findByUserAndType(
    userId: string,
    type: BehaviorType,
  ): Promise<UserBehaviorLog[]> {
    return this.findBy({ userId, type })
  }

  findByUserAndTypeSince(
    userId: string,
    type: BehaviorType,
    since: Date,
  ): Promise<UserBehaviorLog[]> {
    return this.find({
      where: {
        userId,
        type,
        createdAt: { $gte: since },
      } as any,
    })
  }
}
