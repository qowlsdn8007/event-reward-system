import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenerateIdFactory } from './generate-id.factory'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './application/auth.service'
import { User } from './domain/user'
import { AuthController } from './presentation/auth.controller'
import { IUserRepository } from './domain/user.repository.interface'
import { MongoUserRepository } from './infra/user.repository.mongodb'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DB_URL'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    MongoUserRepository,
    {
      provide: 'IUserRepository',
      useClass: MongoUserRepository,
    },
    {
      provide: GenerateIdFactory,
      useValue: new GenerateIdFactory(),
    },
  ],
})
export class AppModule {}
