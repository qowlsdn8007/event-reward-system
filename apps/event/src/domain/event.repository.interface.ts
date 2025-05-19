import { Event } from './event'

export interface IEventRepository {
  saveOneEvent(event: Event): Promise<Event>
  findAll(): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  findByStatus(status: 'ACTIVE' | 'INACTIVE'): Promise<Event[]>
}
