import { CreateVotingController } from '@/adapters/controllers/voting/create/create-voting.controller'
import { MemberGateway } from '@/adapters/gateways/member.gateway'
import { VotingSessionGateway } from '@/adapters/gateways/voting-session.gateway'
import { VotingGateway } from '@/adapters/gateways/voting.gateway'
import { VotingUseCase } from '@/application/usecases/voting/create/create-voting.usecase'

export const createVotingControllerFactory = (): CreateVotingController => {
  const votingGateway = new VotingGateway()
  const memberGateway = new MemberGateway()
  const votingSessionGateway = new VotingSessionGateway()
  const usecase = new VotingUseCase(votingGateway, memberGateway, votingSessionGateway)
  return new CreateVotingController(usecase)
}
