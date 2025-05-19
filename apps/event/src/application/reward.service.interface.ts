import { Reward } from '../domain/reward'

export interface CreateRewardRequest {
  eventId: string
  type: 'POINT' | 'ITEM' | 'COUPON'
  value: string
  quantity?: number
}

export interface IRewardService {
  createReward(dto: CreateRewardRequest): Promise<Reward>
  getAllRewards(): Promise<Reward[]>
  getRewardsByEventId(eventId: string): Promise<Reward[]>
}
