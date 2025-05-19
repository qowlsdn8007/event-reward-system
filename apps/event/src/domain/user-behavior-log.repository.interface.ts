import { UserBehaviorLog, BehaviorType } from './user-behavior-log'

export interface IUserBehaviorLogRepository {
  saveLog(log: UserBehaviorLog): Promise<UserBehaviorLog>
  findByUser(userId: string): Promise<UserBehaviorLog[]>
  findByUserAndType(
    userId: string,
    type: BehaviorType,
  ): Promise<UserBehaviorLog[]>
  findByUserAndTypeSince(
    userId: string,
    type: BehaviorType,
    since: Date,
  ): Promise<UserBehaviorLog[]>
}
