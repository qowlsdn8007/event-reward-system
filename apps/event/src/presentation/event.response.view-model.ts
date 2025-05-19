export class EventViewModel {
  id: string
  name: string
  description: string
  condition: string
  startDate: string
  endDate: string
  status: 'ACTIVE' | 'INACTIVE'
}

export class RewardViewModel {
  id: string
  eventId: string
  type: string
  value: string
  quantity?: string
}

export class ClaimViewModel {
  id: string
  userId: string
  eventId: string
  status: 'SUCCESS' | 'FAILED'
  requestedAt: string
  reason?: string
}
