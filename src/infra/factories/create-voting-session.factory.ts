import { CreateVotingSessionController } from '@/adapters/controllers/voting-session/create/create-voting-session.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { VotingSessionGateway } from '@/adapters/gateways/voting-session.gateway'
import { CreateVotingSessionUseCase } from '@/application/usecases/voting_session/create/create-voting-session.usecase'

export const createVotingSessionControllerFactory = (): CreateVotingSessionController => {
  const motionGateway = new MotionGateway()
  const votingSessionGateway = new VotingSessionGateway()
  const usecase = new CreateVotingSessionUseCase(motionGateway, votingSessionGateway)
  return new CreateVotingSessionController(usecase)
}
