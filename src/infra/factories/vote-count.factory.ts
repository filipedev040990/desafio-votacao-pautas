import { VoteCountController } from '@/adapters/controllers/voting/count/vote-count.controller'
import { VotingSessionGateway } from '@/adapters/gateways/voting-session.gateway'
import { VotingGateway } from '@/adapters/gateways/voting.gateway'
import { VoteCountUseCase } from '@/application/usecases/voting/count/vote-count'

export const voteCountControllerFactory = (): VoteCountController => {
  const votingGateway = new VotingGateway()
  const votingSessinoGateway = new VotingSessionGateway()
  const usecase = new VoteCountUseCase(votingGateway, votingSessinoGateway)
  return new VoteCountController(usecase)
}
