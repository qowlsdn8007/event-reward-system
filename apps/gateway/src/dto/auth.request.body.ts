import { IsIn, IsNotEmpty, IsString } from 'class-validator'

export const USER_ROLES = ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'] as const
export type UserRole = (typeof USER_ROLES)[number]

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
