import { CreateMemberGatewayInputDTO, MemberGatewayInterface, MemberOutputDTO } from '@/domain/gateways/member-gateway.interface'
import { prismaClient } from './prisma-client'

export class MemberGateway implements MemberGatewayInterface {
  async save(data: CreateMemberGatewayInputDTO): Promise<void> {
    await prismaClient.member.create({ data })
  }

  async getByDocument(document: string): Promise<MemberOutputDTO | null> {
    const member = await prismaClient.member.findFirst({ where: { document } })
    return member ?? null
  }
}
