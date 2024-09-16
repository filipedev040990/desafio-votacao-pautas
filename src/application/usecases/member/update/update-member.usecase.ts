import { UpdateMemberInputDTO } from '@/domain/entities/member/member.dto'
import { MemberGatewayInterface, UpdateMemberGatewayInputDTO } from '@/domain/gateways/member-gateway.interface'
import { UpdateMemberUseCaseInterface } from '@/domain/usecases/member/update-member-usecase.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidCpf, isValidString } from '@/shared/helpers/string.helper'

export class UpdateMemberUseCase implements UpdateMemberUseCaseInterface {
  constructor(private readonly gateway: MemberGatewayInterface) {}
  async execute(input: UpdateMemberInputDTO): Promise<void> {
    await this.validate(input)
    await this.gateway.update(this.makeUpdateInput(input))
  }

  async validate(input: UpdateMemberInputDTO): Promise<void> {
    await this.ensureIsValidId(input?.id)

    this.ensureAFieldIsProvided(input)

    await this.ensureIsValidDocument(input.id, input?.document)

    this.ensureIsValidName(input?.name)
  }

  async ensureIsValidId(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('id')
    }

    const member = await this.gateway.getById(id)
    if (!member) {
      throw new InvalidParamError('id')
    }
  }

  async ensureIsValidDocument(id: string, document?: string) {
    if (document === undefined || document === null) {
      return
    }

    if (!isValidCpf(document)) {
      throw new InvalidParamError('document')
    }

    const documentExists = await this.gateway.getByDocument(document)

    if (documentExists && documentExists.id !== id) {
      throw new InvalidParamError('This document already in use')
    }
  }

  ensureIsValidName(name?: string) {
    if (name === undefined || name === null) {
      return
    }

    if (!isValidString(name)) {
      throw new InvalidParamError('name')
    }
  }

  ensureAFieldIsProvided(input: UpdateMemberInputDTO): void {
    if (!input?.name && !input?.document) {
      throw new InvalidParamError('Provided a field to update')
    }
  }

  makeUpdateInput(input: UpdateMemberInputDTO): UpdateMemberGatewayInputDTO {
    const { name, document } = input
    return {
      id: input.id,
      name: name ?? undefined,
      document: document ?? undefined,
      updatedAt: new Date()
    }
  }
}
