import { EventService } from './event.service'
import { ConditionCheckerService } from './condition-checker.service'
import { Inject, Injectable } from '@nestjs/common'
import { IClaimRepository } from '../domain/claim.repository.interface'
import { GenerateIdFactory } from '../generate-id.factory'
import { Claim } from '../domain/claim'
import { CreateClaimRequest } from './claim.service.interface'

@Injectable()
export class ClaimService {
  constructor(
    @Inject('IClaimRepository') private readonly claimRepo: IClaimRepository,
    private readonly generateIdFactory: GenerateIdFactory,
    private readonly eventService: EventService,
    private readonly conditionChecker: ConditionCheckerService,
  ) {}

  async createClaim(params: CreateClaimRequest): Promise<Claim> {
    // 중복 요청 확인
    const existingClaims = await this.claimRepo.findByUserId(params.userId)
    const alreadyClaimed = existingClaims.some(
      (c) => c.eventId === params.eventId,
    )
    if (alreadyClaimed) {
      const duplicate = await Claim.create(
        {
          userId: params.userId,
          eventId: params.eventId,
          status: 'FAILED',
          reason: '이미 보상을 요청한 이벤트입니다.',
          requestedAt: new Date(),
        },
        this.generateIdFactory,
      )
      return this.claimRepo.saveOneClaim(duplicate)
    }

    const event = await this.eventService.getEventById(params.eventId)
    if (!event) {
      throw new Error('이벤트가 존재하지 않습니다.')
    }

    const result = await this.conditionChecker.check(params.userId, event)

    const claim = await Claim.create(
      {
        userId: params.userId,
        eventId: params.eventId,
        status: result.success ? 'SUCCESS' : 'FAILED',
        reason: result.reason,
        requestedAt: new Date(),
      },
      this.generateIdFactory,
    )
    return this.claimRepo.saveOneClaim(claim)
  }

  async getAllClaims(): Promise<Claim[]> {
    return this.claimRepo.findAll()
  }

  async getClaimsByUserId(userId: string): Promise<Claim[]> {
    return this.claimRepo.findByUserId(userId)
  }

  async getClaimsByEventId(eventId: string): Promise<Claim[]> {
    return this.claimRepo.findByEventId(eventId)
  }
}
