import { MemberGatewayInterface } from '@/domain/gateways/member-gateway.interface'
import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session-gateway.interface'
import { VotingUseCaseInputDTO, VotingUseCaseInterface } from '@/domain/usecases/voting_session/voting.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

export class VotingUseCase implements VotingUseCaseInterface {
  constructor(
    private readonly votingGateway: VotingGatewayInterface,
    private readonly memberGateway: MemberGatewayInterface,
    private readonly votingSessinoGateway: VotingSessionGatewayInterface
  ) {}
  async execute(input: VotingUseCaseInputDTO): Promise<void> {
    await this.ensureIsValidMember(input?.memberId)
    await this.ensureIsValidVotingSession(input?.votingSessionId)
    this.ensureIsValidVotingValue(input?.votingValue)
  }

  async ensureIsValidMember(memberId: string): Promise<void> {
    if (!memberId) {
      throw new MissingParamError('memberId')
    }

    const member = await this.memberGateway.getById(memberId)
    if (!member) {
      throw new InvalidParamError('memberId')
    }
  }

  async ensureIsValidVotingSession(votingSessionId: string): Promise<void> {
    if (!votingSessionId) {
      throw new MissingParamError('votingSessionId')
    }

    const votingSession = await this.votingSessinoGateway.getById(votingSessionId)
    if (!votingSession) {
      throw new InvalidParamError('votingSessionId')
    }
  }

  ensureIsValidVotingValue(votingValue: string): void {
    if (!votingValue) {
      throw new MissingParamError('votingValue')
    }

    if (!['Sim', 'Não'].includes(votingValue)) {
      throw new InvalidParamError('votingValue')
    }
  }
}