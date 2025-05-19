import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventController } from './presentation/event.controller'
import { EventService } from './application/event.service'
import { MongoEventRepository } from './infra/event.repository.mongodb'
import { GenerateIdFactory } from './generate-id.factory'
import { Event } from './domain/event'

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
        entities: [Event],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, EventController],
  providers: [
    AppService,
    EventService,
    MongoEventRepository,
    {
      provide: 'IEventRepository',
      useClass: MongoEventRepository,
    },
    {
      provide: GenerateIdFactory,
      useValue: new GenerateIdFactory(),
    },
  ],
})
export class AppModule {}
