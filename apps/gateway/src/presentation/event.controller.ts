import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { EventService } from '../application/event.service'
import {
  ClaimEventRewardRequest,
  CreateEventRequest,
  CreateRewardRequest,
} from '../dto/event.request.body'
import { JwtAuthGuard } from '../infra/jwt-auth.guard'
import { RolesGuard } from '../infra/roles.guard'
import { Roles } from '../infra/roles.decorator'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OPERATOR', 'ADMIN')
  @Post()
  async create(@Req() req, @Body() body: CreateEventRequest) {
    const userName = req.user.username
    return await this.eventService.createEvent(body, userName)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.eventService.getEvents()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getEventDetail(@Param('id') id: string) {
    return await this.eventService.getEventById(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @Post('claim')
  async claimReward(@Body() body: ClaimEventRewardRequest) {
    return await this.eventService.claimReward(body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OPERATOR', 'AUDITOR', 'ADMIN')
  @Get('claim/:userId')
  async getClaimsByUser(@Param('userId') userId: string) {
    return await this.eventService.getClaimsByUserId(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('claim/me')
  getMyClaims(@Req() req) {
    const userId = req.user.userId
    return this.eventService.getClaimsByUserId(userId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OPERATOR', 'ADMIN')
  @Post('reward')
  async createReward(@Body() body: CreateRewardRequest) {
    return await this.eventService.createReward(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('reward')
  async getAllRewards() {
    return await this.eventService.getRewards()
  }

  @UseGuards(JwtAuthGuard)
  @Get('reward/:eventId')
  async getRewardsByEvent(@Param('eventId') eventId: string) {
    return await this.eventService.getRewardsByEventId(eventId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'OPERATOR', 'AUDITOR', 'ADMIN')
  @Get('claim')
  async getClaims() {
    return await this.eventService.getClaimHistory()
  }
}
