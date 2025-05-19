import { Column, Entity, Index } from 'typeorm'
import { BaseMongodbEntity, NonBaseProps } from '../infra/base.mongodb.entity'
import { GenerateIdFactory } from '../generate-id.factory'

export type BehaviorType = 'LOGIN' | 'INVITE' | 'PLAY' | 'LEVEL_UP'

type CreateProps = Omit<
  NonBaseProps<UserBehaviorLog>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class UserBehaviorLog extends BaseMongodbEntity {
  @Column()
  id: string

  @Index()
  @Column()
  userId: string

  @Index()
  @Column()
  type: BehaviorType

  @Index()
  @Column()
  createdAt: Date

  @Column({ nullable: true, type: 'simple-json' })
  meta?: Record<string, any>

  @Column({ nullable: true })
  eventId?: string

  static async create(
    props: CreateProps,
    generateIdFactory: GenerateIdFactory,
  ): Promise<UserBehaviorLog> {
    const log = new UserBehaviorLog({})
    const now = new Date()
    log.id = await generateIdFactory.execute()
    log.userId = props.userId
    log.type = props.type
    log.createdAt = now
    log.meta = props.meta
    log.eventId = props.eventId
    return log
  }
}
