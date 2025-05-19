import { Claim } from '../domain/claim'

export interface CreateClaimRequest {
  userId: string
  eventId: string
  status: 'SUCCESS' | 'FAILED'
  reason?: string
}

export interface IClaimService {
  createClaim(params: CreateClaimRequest): Promise<Claim>
  getAllClaims(): Promise<Claim[]>
  getClaimsByUserId(userId: string): Promise<Claim[]>
  getClaimsByEventId(eventId: string): Promise<Claim[]>
}
