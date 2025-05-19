import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
  CreateEventRequest,
  CreateRewardRequest,
  ClaimEventRewardRequest,
} from '../dto/event.request.body'

@Injectable()
export class EventService {
  constructor(@Inject('EVENT_SERVICE') private readonly client: ClientProxy) {}

  async createEvent(payload: CreateEventRequest) {
    return firstValueFrom(this.client.send('event.create', payload))
  }

  async getEvents() {
    return firstValueFrom(this.client.send('event.get-all', {}))
  }

  async getEventById(eventId: string) {
    return firstValueFrom(this.client.send('event.get-one', { eventId }))
  }

  async createReward(payload: CreateRewardRequest) {
    return firstValueFrom(this.client.send('reward.create', payload))
  }

  async getRewards() {
    return firstValueFrom(this.client.send('reward.get-all', {}))
  }

  async getRewardsByEventId(eventId: string) {
    return firstValueFrom(this.client.send('reward.get-by-event', { eventId }))
  }

  async claimReward(payload: ClaimEventRewardRequest) {
    return firstValueFrom(this.client.send('claim.request', payload))
  }

  async getClaimHistory() {
    return firstValueFrom(this.client.send('claim.get-all', {}))
  }

  async getClaimsByUserId(userId: string) {
    return firstValueFrom(this.client.send('claim.get-by-user', { userId }))
  }
}
