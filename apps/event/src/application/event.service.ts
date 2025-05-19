import { Inject, Injectable } from '@nestjs/common'
import { IEventRepository } from '../domain/event.repository.interface'
import { Event } from '../domain/event'
import { GenerateIdFactory } from '../generate-id.factory'
import { CreateEventRequest, IEventService } from './event.service.interface'

@Injectable()
export class EventService implements IEventService {
  constructor(
    @Inject('IEventRepository') private readonly eventRepo: IEventRepository,
    private readonly generateIdFactory: GenerateIdFactory,
  ) {}

  async createEvent(dto: CreateEventRequest): Promise<Event> {
    const event = await Event.create(
      {
        name: dto.name,
        description: dto.description,
        condition: dto.condition,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        createdBy: dto.createdBy,
        status: dto.status,
      },
      this.generateIdFactory,
    )
    return await this.eventRepo.saveOneEvent(event)
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepo.findAll()
  }

  async getEventById(id: string): Promise<Event | null> {
    return await this.eventRepo.findById(id)
  }

  async getActiveEvents(): Promise<Event[]> {
    return await this.eventRepo.findByStatus('ACTIVE')
  }
}
