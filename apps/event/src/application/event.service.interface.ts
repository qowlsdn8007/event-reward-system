import { Event } from '../domain/event'

interface EventCondition {
  type: 'LOGIN_CONSECUTIVE_DAYS' | string
  value: number
}

export interface CreateEventRequest {
  name: string
  description: string
  condition: EventCondition
  startDate: string // ISO 형식 문자열
  endDate: string
  status: 'ACTIVE' | 'INACTIVE'
  createdBy: string
}

export interface IEventService {
  createEvent(dto: CreateEventRequest, createdBy: string): Promise<Event>
  getAllEvents(): Promise<Event[]>
  getEventById(id: string): Promise<Event | null>
  getActiveEvents(): Promise<Event[]>
}
