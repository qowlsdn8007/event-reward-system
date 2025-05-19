import { Column, Entity } from 'typeorm'
import { BaseMongodbEntity, NonBaseProps } from '../infra/base.mongodb.entity'
import { GenerateIdFactory } from '../generate-id.factory'

type CreateProps = Omit<
  NonBaseProps<Claim>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class Claim extends BaseMongodbEntity {
  @Column()
  id: string

  @Column()
  userId: string

  @Column()
  eventId: string

  @Column()
  status: 'SUCCESS' | 'FAILED'

  @Column({ nullable: true })
  reason?: string

  @Column()
  requestedAt: Date

  static async create(
    props: CreateProps,
    generateIdFactory: GenerateIdFactory,
  ): Promise<Claim> {
    const claim = new Claim({})
    claim.id = await generateIdFactory.execute()
    claim.userId = props.userId
    claim.eventId = props.eventId
    claim.status = props.status
    claim.reason = props.reason
    claim.requestedAt = props.requestedAt
    return claim
  }
}
