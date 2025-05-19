import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { BaseMongodbEntity, NonBaseProps } from '../infra/base.mongodb.entity'
import { GenerateIdFactory } from '../generate-id.factory'

type CreateProps = Omit<
  NonBaseProps<Event>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class Event extends BaseMongodbEntity {
  @Column()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  condition: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column()
  status: 'ACTIVE' | 'INACTIVE'

  @Column()
  createdBy: string // 유저 ID 또는 username

  static async create(
    props: CreateProps,
    generateIdFactory: GenerateIdFactory,
  ): Promise<Event> {
    const event = new Event({})
    const id = await generateIdFactory.execute()
    event.id = id
    event.name = props.name
    event.description = props.description
    event.condition = props.condition
    event.startDate = props.startDate
    event.endDate = props.endDate
    event.status = props.status
    event.createdBy = props.createdBy
    return event
  }
}
