import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseRepository } from './base.mongodb.repository'
import { Claim } from '../domain/claim'
import { IClaimRepository } from '../domain/claim.repository.interface'

@Injectable()
export class MongoClaimRepository
  extends BaseRepository<Claim>
  implements IClaimRepository
{
  constructor(dataSource: DataSource) {
    super(Claim, dataSource)
  }

  async saveOneClaim(claim: Claim): Promise<Claim> {
    return this.save(claim)
  }

  async findAll(): Promise<Claim[]> {
    return this.find()
  }

  async findByUserId(userId: string): Promise<Claim[]> {
    return this.findBy({ userId })
  }

  async findByEventId(eventId: string): Promise<Claim[]> {
    return this.findBy({ eventId })
  }
}
