import { Column, Entity } from 'typeorm'
import { BaseMongodbEntity, NonBaseProps } from '../infra/base.mongodb.entity'
import { GenerateIdFactory } from '../generate-id.factory'

type CreateProps = Omit<
  NonBaseProps<Reward>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class Reward extends BaseMongodbEntity {
  @Column()
  id: string

  @Column()
  eventId: string

  @Column()
  type: 'POINT' | 'ITEM' | 'COUPON'

  @Column()
  value: string

  @Column({ nullable: true })
  quantity?: number

  static async create(
    props: CreateProps,
    generateIdFactory: GenerateIdFactory,
  ): Promise<Reward> {
    const reward = new Reward({})
    reward.id = await generateIdFactory.execute()
    reward.eventId = props.eventId
    reward.type = props.type
    reward.value = props.value
    reward.quantity = props.quantity
    return reward
  }
}
