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

  createEvent(payload: CreateEventRequest, userName: string) {
    payload['createdBy'] = userName
    return firstValueFrom(this.client.send({ cmd: 'event.create' }, payload))
  }

  getEvents() {
    return firstValueFrom(this.client.send({ cmd: 'event.get-all' }, {}))
  }

  getEventById(eventId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'event.get-one' }, { eventId }),
    )
  }

  createReward(payload: CreateRewardRequest) {
    return firstValueFrom(this.client.send({ cmd: 'reward.create' }, payload))
  }

  getRewards() {
    return firstValueFrom(this.client.send({ cmd: 'reward.get-all' }, {}))
  }

  getRewardsByEventId(eventId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'reward.get-by-event' }, { eventId }),
    )
  }

  claimReward(payload: ClaimEventRewardRequest) {
    return firstValueFrom(this.client.send({ cmd: 'claim.request' }, payload))
  }

  getClaimHistory() {
    return firstValueFrom(this.client.send({ cmd: 'claim.get-all' }, {}))
  }

  getClaimsByUserId(userId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'claim.get-by-user' }, { userId }),
    )
  }
}
