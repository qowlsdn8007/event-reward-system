import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Reward } from '../domain/reward'
import { BaseRepository } from './base.mongodb.repository'
import { IRewardRepository } from '../domain/reward.repository.interface'

@Injectable()
export class MongoRewardRepository
  extends BaseRepository<Reward>
  implements IRewardRepository
{
  constructor(dataSource: DataSource) {
    super(Reward, dataSource)
  }

  async saveOneReward(reward: Reward): Promise<Reward> {
    return this.save(reward)
  }

  async findAll(): Promise<Reward[]> {
    return this.find()
  }

  async findById(id: string): Promise<Reward | null> {
    return this.findOne({ where: { id } })
  }

  async findByEventId(eventId: string): Promise<Reward[]> {
    return this.findBy({ eventId })
  }
}
