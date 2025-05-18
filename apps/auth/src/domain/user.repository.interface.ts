// domain/repositories/user.repository.interface.ts
import { User } from './user'

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
}
