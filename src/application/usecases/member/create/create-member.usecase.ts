import { MemberInputDTO } from '@/domain/entities/member/member.dto'
import { MemberEntity } from '@/domain/entities/member/member.entity'
import { MemberGatewayInterface } from '@/domain/gateways/member.gateway.interface'
import { CreateMemberUseCaseInterface } from '@/domain/usecases/member/create-member-usecase.interface'
import { InvalidParamError } from '@/shared/errors'

export class CreateMemberUseCase implements CreateMemberUseCaseInterface {
  constructor(private readonly gateway: MemberGatewayInterface) {}
  async execute(input: MemberInputDTO): Promise<{ id: string }> {
    const member = MemberEntity.build(input)

    const documentExists = await this.gateway.getByDocument(input.document)
    if (documentExists) {
      throw new InvalidParamError('This document already exists')
    }

    await this.gateway.save(member)
    return { id: member.id }
  }
}
