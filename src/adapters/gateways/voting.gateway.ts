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

  async getBySessionId(sessionId: string): Promise<any | null> {
    const votes = await prismaClient.votes.findFirst({
      where: {
        id: sessionId
      },
      select: {
        votingValue: true,
        VotingSession: {
          select: {
            startVoting: true,
            endVoting: true,
            Motion: {
              select: {
                name: true,
                description: true
              }
            }
          }
        }
      }
    })

    return votes ?? null
  }
}
