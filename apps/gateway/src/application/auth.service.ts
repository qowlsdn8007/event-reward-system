import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
  EditRoleRequestBody,
  LoginRequestBody,
  RegisterUserRequestBody,
} from '../dto/auth.request.body'

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async login(payload: LoginRequestBody) {
    return firstValueFrom(this.client.send('auth.login', payload))
  }

  async register(payload: RegisterUserRequestBody) {
    return firstValueFrom(this.client.send('auth.register', payload))
  }

  async editRole(payload: EditRoleRequestBody) {
    return firstValueFrom(this.client.send('auth.edit-role', payload))
  }
}
