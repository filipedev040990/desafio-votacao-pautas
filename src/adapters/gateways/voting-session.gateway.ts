import {
  CreateVotingSessionInputDTO,
  CreateVotingSessionOutputDTO,
  VotingSessionGatewayInterface
} from '@/domain/gateways/voting-session-gateway.interface'
import { prismaClient } from './prisma-client'

export class VotingSessionGateway implements VotingSessionGatewayInterface {
  async save(data: CreateVotingSessionInputDTO): Promise<void> {
    await prismaClient.votingSession.create({ data })
  }

  async getById(id: string): Promise<CreateVotingSessionOutputDTO | null> {
    const votingSession = await prismaClient.votingSession.findFirst({ where: { id } })
    return votingSession ?? null
  }
}
