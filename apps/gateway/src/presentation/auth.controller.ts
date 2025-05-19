import { Body, Controller, Post, Put } from '@nestjs/common'
import { AuthService } from '../application/auth/auth.service'
import {
  EditRoleRequestBody,
  LoginRequestBody,
  RegisterUserRequestBody,
} from '../dto/auth.request.body'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestBody) {
    return await this.authService.login(body)
  }

  @Post('register')
  async register(@Body() body: RegisterUserRequestBody) {
    return await this.authService.register(body)
  }

  @Put('role')
  async editRole(@Body() body: EditRoleRequestBody) {
    return await this.authService.editRole(body)
  }
}
