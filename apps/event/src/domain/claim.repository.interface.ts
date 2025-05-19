import { Claim } from './claim'

export interface IClaimRepository {
  saveOneClaim(claim: Claim): Promise<Claim>
  findAll(): Promise<Claim[]>
  findByUserId(userId: string): Promise<Claim[]>
  findByEventId(eventId: string): Promise<Claim[]>
}
