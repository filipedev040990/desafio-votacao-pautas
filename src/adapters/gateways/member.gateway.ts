import {
  CreateMemberGatewayInputDTO,
  MemberGatewayInterface,
  MemberOutputDTO,
  UpdateMemberGatewayInputDTO
} from '@/domain/gateways/member-gateway.interface'
import { prismaClient } from './prisma-client'

export class MemberGateway implements MemberGatewayInterface {
  async save(data: CreateMemberGatewayInputDTO): Promise<void> {
    await prismaClient.member.create({ data })
  }

  async getByDocument(document: string): Promise<MemberOutputDTO | null> {
    const member = await prismaClient.member.findFirst({ where: { document } })
    return member ?? null
  }

  async update(input: UpdateMemberGatewayInputDTO): Promise<void> {
    const { id, ...data } = input
    await prismaClient.member.update({
      where: {
        id: input.id
      },
      data
    })
  }

  async getById(id: string): Promise<MemberOutputDTO | null> {
    const member = await prismaClient.member.findFirst({ where: { id } })
    return member ?? null
  }
}
