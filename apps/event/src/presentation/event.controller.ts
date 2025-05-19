import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { EventService } from '../application/event.service'
import { CreateEventRequest } from './event.request.body'

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('event.create')
  async createEvent(@Payload() data: CreateEventRequest) {
    return this.eventService.createEvent({
      name: data.name,
      description: data.description,
      condition: data.condition,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      createdBy: data.createdBy,
    })
  }

  @MessagePattern('event.get-all')
  async getAll() {
    return this.eventService.getAllEvents()
  }

  @MessagePattern('event.get-one')
  async getOne(@Payload() data: { eventId: string }) {
    return this.eventService.getEventById(data.eventId)
  }
}
