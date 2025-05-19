import { Inject, Injectable } from '@nestjs/common'
import { Event } from '../domain/event'
import { IUserBehaviorLogRepository } from '../domain/user-behavior-log.repository.interface'

@Injectable()
export class ConditionCheckerService {
  constructor(
    @Inject('IUserBehaviorLogRepository')
    private readonly userBehaviorLogRepo: IUserBehaviorLogRepository,
  ) {}

  async check(
    userId: string,
    event: Event,
  ): Promise<{ success: boolean; reason?: string }> {
    if (!event.condition || !event.condition.type || !event.condition.value) {
      return { success: false, reason: '이벤트 조건 정보가 유효하지 않습니다.' }
    }

    switch (event.condition.type) {
      case 'LOGIN_CONSECUTIVE_DAYS':
        return this.checkConsecutiveLoginDays(userId, event.condition.value)
      default:
        return {
          success: false,
          reason: `지원하지 않는 조건 유형입니다: ${event.condition.type}`,
        }
    }
  }

  private async checkConsecutiveLoginDays(
    userId: string,
    days: number,
  ): Promise<{ success: boolean; reason?: string }> {
    const logs = await this.userBehaviorLogRepo.findByUserAndType(
      userId,
      'LOGIN',
    )

    // Extract and deduplicate YYYY-MM-DD strings
    const uniqueDates = Array.from(
      new Set(
        logs.map((log) => {
          const date = log.createdAt
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }),
      ),
    )

    const sortedDates = uniqueDates
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => b.getTime() - a.getTime())

    let count = 1
    for (let i = 1; i < sortedDates.length; i++) {
      const diffInDays =
        (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
        (1000 * 60 * 60 * 24)

      if (diffInDays === 1) {
        count++
      } else if (diffInDays > 1) {
        break
      }
    }

    if (count >= days) return { success: true }

    return {
      success: false,
      reason: `${days}일 연속 로그인 조건을 만족하지 못했습니다.`,
    }
  }
}
