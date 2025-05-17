import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get('/hello')
  async getHello() {
    const result = await firstValueFrom(this.authClient.send('hello', {}))
    return result
  }
}
