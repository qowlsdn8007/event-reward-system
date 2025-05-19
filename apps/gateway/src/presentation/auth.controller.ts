import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { AuthService } from '../application/auth/auth.service'
import {
  EditRoleRequestBody,
  LoginRequestBody,
  RegisterUserRequestBody,
} from '../dto/auth.request.body'
import { Roles } from '../infra/roles.decorator'
import { JwtAuthGuard } from '../infra/jwt-auth.guard'
import { RolesGuard } from '../infra/roles.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestBody) {
    return await this.authService.login(body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  async register(@Body() body: RegisterUserRequestBody) {
    return await this.authService.register(body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('role')
  async editRole(@Body() body: EditRoleRequestBody) {
    return await this.authService.editRole(body)
  }
}
