import { UserRole, User } from '../domain/user'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface RegisterUserRequest {
  username: string
  password: string
  role: UserRole
}

export interface EditRoleRequest {
  userId: string
  role: UserRole
}

export interface IAuthService {
  login(req: LoginRequest): Promise<LoginResponse>

  register(req: RegisterUserRequest): Promise<User>

  editRole(req: EditRoleRequest): Promise<User>
}
