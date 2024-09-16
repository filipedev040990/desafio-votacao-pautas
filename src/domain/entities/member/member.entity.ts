import { InvalidParamError } from '@/shared/errors'
import { MemberInputDTO } from './member.dto'
import { isValidCpf, isValidString } from '@/shared/helpers/string.helper'
import { randomUUID } from 'crypto'

export class MemberEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  public static build(input: MemberInputDTO): MemberEntity {
    this.validate(input)
    return this.create(input)
  }

  private static validate(input: MemberInputDTO): void {
    if (!isValidString(input?.name)) {
      throw new InvalidParamError('name')
    }

    if (!isValidString(input?.document) || !isValidCpf(input?.document)) {
      throw new InvalidParamError('document')
    }
  }

  private static create(input: MemberInputDTO): MemberEntity {
    const { name, document } = input
    return new MemberEntity(randomUUID(), name, document, new Date(), new Date())
  }
}
