import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  condition: string

  @IsString()
  @IsNotEmpty()
  startDate: string // ISO 형식 문자열

  @IsString()
  @IsNotEmpty()
  endDate: string
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
  value: string // ex) 쿠폰코드, 포인트 값 등

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
