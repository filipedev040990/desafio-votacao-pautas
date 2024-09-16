import { CreateVotingSessionInputDTO, VotingSessionGatewayInterface } from '@/domain/gateways/voting-session.gateway'
import { prismaClient } from './prisma-client'

export class VotingSessionGateway implements VotingSessionGatewayInterface {
  async save(data: CreateVotingSessionInputDTO): Promise<void> {
    await prismaClient.votingSession.create({ data })
  }
}
