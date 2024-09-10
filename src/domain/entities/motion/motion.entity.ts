import { isValidString } from '@/shared/helpers/string.helper'
import { MotionInputDTO } from './motion.dto'
import { InvalidParamError } from '@/shared/errors'
import { randomUUID } from 'crypto'

export class MotionEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  public static build({ name, description }: MotionInputDTO): MotionEntity {
    this.validate(name, description)
    return this.create(name, description)
  }

  private static validate(name: string, description: string): void {
    if (!isValidString(name)) {
      throw new InvalidParamError('name')
    }
    if (!isValidString(description)) {
      throw new InvalidParamError('description')
    }
  }

  private static create(name: string, description: string): MotionEntity {
    const now = new Date()
    return new MotionEntity(randomUUID(), name, description, now, now)
  }
}
