import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session-gateway.interface'
import {
  CreateVotingSessionInputDTO,
  CreateVotingSessionUseCaseInterface,
  CreateVotingSessionOutputDTO
} from '@/domain/usecases/voting_session/create-voting-session.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'
import { randomUUID } from 'crypto'

export class CreateVotingSessionUseCase implements CreateVotingSessionUseCaseInterface {
  constructor(private readonly motionGateway: MotionGatewayInterface, private readonly votingSessionGateway: VotingSessionGatewayInterface) {}
  async execute(input: CreateVotingSessionInputDTO): Promise<CreateVotingSessionOutputDTO> {
    await this.ensureIsValidMotionId(input?.motionId)
    await this.ensureIsUniqueVotingSession(input.motionId)

    this.ensureIsValidStartVoting(input?.startVoting)
    this.ensureIsValidEndVoting(input?.startVoting, input?.endVoting)

    const votingSession = {
      id: randomUUID(),
      motionId: input.motionId,
      startVoting: new Date(input.startVoting),
      endVoting: this.getEndVoting(input?.startVoting, input?.endVoting),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.votingSessionGateway.save(votingSession)

    return votingSession
  }

  async ensureIsUniqueVotingSession(motionId: string): Promise<void> {
    const votingSession = await this.motionGateway.getVotingSessionByMotionId(motionId)
    if (votingSession) {
      throw new InvalidParamError('This motion has already a vote')
    }
  }

  async ensureIsValidMotionId(motionId: string): Promise<void> {
    if (!isValidString(motionId)) {
      throw new MissingParamError('motionId')
    }

    const motion = await this.motionGateway.getById(motionId)
    if (!motion) {
      throw new InvalidParamError('Motion not found')
    }
  }

  ensureIsValidStartVoting(startVoting: Date): void {
    if (!startVoting) {
      throw new MissingParamError('startVoting')
    }

    if (new Date(startVoting) < new Date()) {
      throw new InvalidParamError('startVoting')
    }
  }

  ensureIsValidEndVoting(startVoting: Date, endVoting?: Date): void {
    if (!endVoting) {
      return
    }

    if (new Date(startVoting) > new Date(endVoting) || new Date(endVoting) < new Date()) {
      throw new InvalidParamError('endVoting')
    }
  }

  getEndVoting(startVoting: Date, endVoting?: Date): Date {
    if (endVoting) {
      return new Date(endVoting)
    }
    return new Date(new Date(startVoting).getTime() + 60000)
  }
}
