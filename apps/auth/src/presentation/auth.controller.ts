import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import {
  EditRoleRequestBody,
  LoginRequestBody,
  RegisterUserRequestBody,
} from './auth.request.body'
import { AuthService } from '../application/auth.service'
import { LoginViewModel } from './auth.response.view-model'

@Controller()
export class AuthController {
  constructor(private readonly useCase: AuthService) {}
  @MessagePattern('auth.login')
  async login(@Payload() req: LoginRequestBody) {
    const response = await this.useCase.login({
      username: req.username,
      password: req.password,
    })

    return new LoginViewModel({
      accessToken: response.access_token,
    })
  }

  @MessagePattern('auth.register')
  async register(@Payload() req: RegisterUserRequestBody) {
    const response = await this.useCase.register({
      username: req.username,
      password: req.password,
      role: req.role,
    })

    return {
      id: response.id,
      username: response.username,
      role: response.role,
    }
  }

  @MessagePattern('auth.edit-role')
  async editRole(@Payload() req: EditRoleRequestBody) {
    const response = await this.useCase.editRole({
      userId: req.userId,
      role: req.role,
    })

    return {
      id: response.id,
      username: response.username,
      role: response.role,
    }
  }
}
