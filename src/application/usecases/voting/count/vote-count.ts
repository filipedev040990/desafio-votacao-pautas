import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { VoteCountInputDTO, VoteCountUseCaseInterface } from '@/domain/usecases/voting_session/vote-count.interface'
import { MissingParamError } from '@/shared/errors'

export class VoteCountUseCase implements VoteCountUseCaseInterface {
  constructor(private readonly votingGateway: VotingGatewayInterface) {}
  async execute(votingSessionId: string): Promise<VoteCountInputDTO | null> {
    if (!votingSessionId) {
      throw new MissingParamError('votingSessionId')
    }

    const votes = await this.votingGateway.getBySessionId(votingSessionId)

    return votes
  }
}
