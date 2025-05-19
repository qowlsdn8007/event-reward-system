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
import { RewardService } from './application/reward.service'
import { ClaimService } from './application/claim.service'
import { MongoRewardRepository } from './infra/reward.repository.mongodb'
import { MongoClaimRepository } from './infra/claim.repository.mongodb'
import { ConditionCheckerService } from './application/condition-checker.service'
import { MongoUserBehaviorLogRepository } from './infra/user-behavior-log.repository.mongodb'
import { RewardController } from './presentation/reward.controller'
import { ClaimController } from './presentation/claim.controller'

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
  controllers: [
    AppController,
    EventController,
    RewardController,
    ClaimController,
  ],
  providers: [
    AppService,
    EventService,
    RewardService,
    ClaimService,
    ConditionCheckerService,
    MongoEventRepository,
    MongoRewardRepository,
    MongoClaimRepository,
    MongoUserBehaviorLogRepository,
    {
      provide: 'IEventRepository',
      useClass: MongoEventRepository,
    },
    {
      provide: GenerateIdFactory,
      useValue: new GenerateIdFactory(),
    },
    {
      provide: 'IRewardRepository',
      useClass: MongoRewardRepository,
    },
    {
      provide: 'IClaimRepository',
      useClass: MongoClaimRepository,
    },
    {
      provide: 'IUserBehaviorLogRepository',
      useClass: MongoUserBehaviorLogRepository,
    },
  ],
})
export class AppModule {}
