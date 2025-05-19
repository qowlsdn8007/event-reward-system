import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './presentation/auth.controller'
import { AuthService } from './application/auth/auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './infra/jwt.strategy'
import { RolesGuard } from './infra/roles.guard'
import { EventController } from './presentation/event.controller'
import { EventService } from './application/event.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_SERVICE_HOST') ?? 'localhost',
            port: configService.get('AUTH_SERVICE_PORT') ?? 3001,
          },
        }),
      },
      {
        name: 'EVENT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('EVENT_SERVICE_HOST') ?? 'localhost',
            port: configService.get('EVENT_SERVICE_PORT') ?? 3002,
          },
        }),
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController, EventController],
  providers: [AuthService, EventService, JwtStrategy, RolesGuard],
})
export class AppModule {}
