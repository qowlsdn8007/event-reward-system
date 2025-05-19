import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator'

class EventCondition {
  @IsString()
  @IsNotEmpty()
  type: 'LOGIN_CONSECUTIVE_DAYS' | string

  @IsNumber()
  @IsNotEmpty()
  value: number
}

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @ValidateNested({ each: true })
  @Type(() => EventCondition)
  condition: EventCondition

  @IsString()
  @IsNotEmpty()
  startDate: string // ISO 형식 문자열

  @IsString()
  @IsNotEmpty()
  endDate: string

  @IsString()
  @IsNotEmpty()
  status: 'ACTIVE' | 'INACTIVE'

  @IsString()
  @IsNotEmpty()
  createdBy: string
}

export class CreateRewardRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string

  @IsString()
  @IsNotEmpty()
  type: string // e.g. 'POINT', 'ITEM'

  @IsString()
  @IsNotEmpty()
  value: string // ex) coupon code, point amount etc....

  @IsString()
  @IsOptional()
  quantity?: string
}

export class ClaimEventRewardRequest {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  eventId: string
}
