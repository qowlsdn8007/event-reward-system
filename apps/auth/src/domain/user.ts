import { BaseMongodbEntity, NonBaseProps } from '../infra/base.mongodb.entity'
import { GenerateIdFactory } from '../generate-id.factory'
import { Column, Entity } from 'typeorm'

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export const USER_ROLES = ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'] as const
export type UserRole = (typeof USER_ROLES)[number]

type CreateProps = Omit<
  NonBaseProps<User>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity('users')
export class User extends BaseMongodbEntity {
  @Column()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  role: Role

  static async create(
    props: CreateProps,
    generateIdFactory: GenerateIdFactory,
  ): Promise<User> {
    const id = await generateIdFactory.execute()
    console.log('id', id)
    const now = new Date()
    console.log('props', props)
    const user = new User({})
    user.id = id
    user.username = props.username
    user.password = props.password
    user.role = props.role
    return user
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN
  }

  updateRole(role: Role): void {
    console.log(this)
    this.role = role
  }
}
