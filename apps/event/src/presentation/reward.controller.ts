import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RewardService } from '../application/reward.service'
import { CreateRewardRequest } from '../application/reward.service.interface'

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern('reward.create')
  async createReward(@Payload() dto: CreateRewardRequest) {
    return this.rewardService.createReward(dto)
  }

  @MessagePattern('reward.get-all')
  async getAllRewards() {
    return this.rewardService.getAllRewards()
  }

  @MessagePattern('reward.get-by-event')
  async getRewardsByEventId(@Payload() data: { eventId: string }) {
    return this.rewardService.getRewardsByEventId(data.eventId)
  }
}
