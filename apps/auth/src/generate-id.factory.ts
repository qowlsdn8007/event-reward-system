import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

@Injectable()
export class GenerateIdFactory {
  constructor() {}

  async execute(): Promise<string> {
    return randomUUID()
  }
}
