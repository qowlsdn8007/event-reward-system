import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { USER_ROLES, UserRole } from '../domain/user'

export class LoginRequestBody {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class RegisterUserRequestBody {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsIn(USER_ROLES)
  @IsNotEmpty()
  role: UserRole
}

export class EditRoleRequestBody {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsIn(USER_ROLES)
  @IsNotEmpty()
  role: UserRole
}
