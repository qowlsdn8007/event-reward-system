import { Inject, Injectable } from '@nestjs/common'
import { IRewardRepository } from '../domain/reward.repository.interface'
import { GenerateIdFactory } from '../generate-id.factory'
import { CreateRewardRequest } from './reward.service.interface'
import { Reward } from '../domain/reward'

@Injectable()
export class RewardService {
  constructor(
    @Inject('IRewardRepository') private readonly rewardRepo: IRewardRepository,
    private readonly generateIdFactory: GenerateIdFactory,
  ) {}

  async createReward(dto: CreateRewardRequest): Promise<Reward> {
    const reward = await Reward.create(
      {
        eventId: dto.eventId,
        type: dto.type,
        value: dto.value,
        quantity: dto.quantity,
      },
      this.generateIdFactory,
    )
    return await this.rewardRepo.saveOneReward(reward)
  }

  async getAllRewards(): Promise<Reward[]> {
    return await this.rewardRepo.findAll()
  }

  async getRewardsByEventId(eventId: string): Promise<Reward[]> {
    return await this.rewardRepo.findByEventId(eventId)
  }
}
