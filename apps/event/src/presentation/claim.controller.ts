import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ClaimService } from '../application/claim.service'
import { CreateClaimRequest } from '../application/claim.service.interface'

@Controller()
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @MessagePattern('claim.request')
  async createClaim(@Payload() dto: CreateClaimRequest) {
    return this.claimService.createClaim(dto)
  }

  @MessagePattern('claim.get-all')
  async getAllClaims() {
    return this.claimService.getAllClaims()
  }

  @MessagePattern('claim.get-by-user')
  async getClaimsByUserId(@Payload() data: { userId: string }) {
    return this.claimService.getClaimsByUserId(data.userId)
  }

  @MessagePattern('claim.get-by-event')
  async getClaimsByEventId(@Payload() data: { eventId: string }) {
    return this.claimService.getClaimsByEventId(data.eventId)
  }
}
