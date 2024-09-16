import { CreateMemberGatewayInputDTO, MemberGatewayInterface } from '@/domain/gateways/member.gateway.interface'
import { prismaClient } from './prisma-client'

export class MemberGateway implements MemberGatewayInterface {
  async save(data: CreateMemberGatewayInputDTO): Promise<void> {
    await prismaClient.member.create({ data })
  }
}
