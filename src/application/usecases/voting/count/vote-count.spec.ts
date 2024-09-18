import { MissingParamError } from '@/shared/errors'
import { VoteCountUseCase } from './vote-count'
import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { mock } from 'jest-mock-extended'

const votingGateway = mock<VotingGatewayInterface>()

describe('VoteCountUseCase', () => {
  let sut: VoteCountUseCase
  let votingSessionId: string

  beforeEach(() => {
    sut = new VoteCountUseCase(votingGateway)
    votingSessionId = 'anyVotingSession'
  })

  test('should throw if votingSessionId is not provided', async () => {
    await expect(() => sut.execute(null as any)).rejects.toThrowError(new MissingParamError('votingSessionId'))
  })

  test('should call VotingSessionGateway.getBySessionId once and with correct value', async () => {
    await sut.execute(votingSessionId)
    expect(votingGateway.getBySessionId).toBeCalledTimes(1)
    expect(votingGateway.getBySessionId).toBeCalledWith('anyVotingSession')
  })
})
