import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, MongoRepository } from 'typeorm'
import { Event } from '../domain/event'
import { IEventRepository } from '../domain/event.repository.interface'
import { BaseRepository } from './base.mongodb.repository'

@Injectable()
export class MongoEventRepository extends BaseRepository<Event> {
  constructor(dataSource: DataSource) {
    super(Event, dataSource)
  }

  async saveOneEvent(event: Event): Promise<Event> {
    return this.save(event)
  }

  findAll(): Promise<Event[]> {
    return this.find()
  }

  async findById(id: string): Promise<Event | null> {
    return this.findOne({ where: { id } })
  }

  findByStatus(status: 'ACTIVE' | 'INACTIVE'): Promise<Event[]> {
    return this.findBy({ status })
  }
}
