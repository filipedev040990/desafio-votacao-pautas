import { CreateVotingGatewayInputDTO, VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { prismaClient } from './prisma-client'

export class VotingGateway implements VotingGatewayInterface {
  async save(data: CreateVotingGatewayInputDTO): Promise<void> {
    await prismaClient.votes.create({ data })
  }

  async getByMemberAndVotingSession(memberId: string, votingSessionId: string): Promise<CreateVotingGatewayInputDTO | null> {
    const vote = await prismaClient.votes.findFirst({ where: { memberId, votingSessionId } })
    return vote ?? null
  }
}
