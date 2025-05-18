import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule)
  const configService = appContext.get(ConfigService)

  const host = configService.get('AUTH_SERVICE_HOST') ?? 'localhost'
  const port = configService.get('DEFAULT_PORT') ?? 3001

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  )
  app.listen()
}
bootstrap()
