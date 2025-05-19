import { Reward } from './reward'

export interface IRewardRepository {
  saveOneReward(reward: Reward): Promise<Reward>
  findAll(): Promise<Reward[]>
  findById(id: string): Promise<Reward | null>
  findByEventId(eventId: string): Promise<Reward[]>
}
