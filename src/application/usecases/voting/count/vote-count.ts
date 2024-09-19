import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session-gateway.interface'
import { Vote, VoteCountOutputDTO, VoteCountUseCaseInterface } from '@/domain/usecases/voting_session/vote-count.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

export class VoteCountUseCase implements VoteCountUseCaseInterface {
  constructor(private readonly votingGateway: VotingGatewayInterface, private readonly votingSessinoGateway: VotingSessionGatewayInterface) {}
  async execute(votingSessionId: string): Promise<VoteCountOutputDTO | null> {
    await this.ensureIsValidVotingSession(votingSessionId)

    const votes = await this.votingGateway.getBySessionId(votingSessionId)

    return this.makeOutput(votes)
  }

  async ensureIsValidVotingSession(votingSessionId: string): Promise<void> {
    if (!votingSessionId) {
      throw new MissingParamError('votingSessionId')
    }

    const votingSession = await this.votingSessinoGateway.getById(votingSessionId)
    if (!votingSession) {
      throw new InvalidParamError('votingSessionId')
    }

    if (new Date() > new Date(votingSession.endVoting)) {
      throw new InvalidParamError('This motion end voting has passed')
    }
  }

  makeOutput(votes: Vote[]): VoteCountOutputDTO | null {
    if (!votes?.length) {
      return null
    }

    const totalVotes = votes.length
    const voteCounts = votes.reduce(
      (acc, vote) => {
        if (vote.votingValue === 'Sim') {
          acc.yesVote++
        } else {
          acc.noVote++
        }
        return acc
      },
      { yesVote: 0, noVote: 0 }
    )

    return {
      motion: {
        name: votes[0].VotingSession.Motion.name,
        description: votes[0].VotingSession.Motion.description
      },
      session: {
        start: votes[0].VotingSession.startVoting,
        end: votes[0].VotingSession.endVoting
      },
      values: {
        Sim: {
          total: voteCounts.yesVote,
          percent: totalVotes ? Math.round((voteCounts.yesVote * 100) / totalVotes) : 0
        },
        Não: {
          total: voteCounts.noVote,
          percent: totalVotes ? Math.round((voteCounts.noVote * 100) / totalVotes) : 0
        }
      },
      total: totalVotes
    }
  }
}
