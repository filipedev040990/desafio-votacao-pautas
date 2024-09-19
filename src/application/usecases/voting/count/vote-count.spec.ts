import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { VoteCountUseCase } from './vote-count'
import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session-gateway.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const votingGateway = mock<VotingGatewayInterface>()
const votingSessinoGateway = mock<VotingSessionGatewayInterface>()
describe('VoteCountUseCase', () => {
  let sut: VoteCountUseCase
  let votingSessionId: string
  let fakeVotingSession: any

  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new VoteCountUseCase(votingGateway, votingSessinoGateway)
    votingSessionId = 'anyVotingSession'
    fakeVotingSession = {
      id: 'anyVotingSessoionId',
      motionId: 'anyMotionId',
      startVoting: new Date(),
      endVoting: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    votingSessinoGateway.getById.mockResolvedValue(fakeVotingSession)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if votingSessionId is not provided', async () => {
    await expect(() => sut.execute(null as any)).rejects.toThrowError(new MissingParamError('votingSessionId'))
  })

  test('should call VotingSessionGateway.getBySessionId once and with correct value', async () => {
    await sut.execute(votingSessionId)
    expect(votingGateway.getBySessionId).toBeCalledTimes(1)
    expect(votingGateway.getBySessionId).toBeCalledWith('anyVotingSession')
  })

  test('should throw if endVoting has passed', async () => {
    votingSessinoGateway.getById.mockResolvedValueOnce({
      id: 'anyVotingSessoionId',
      motionId: 'anyMotionId',
      startVoting: new Date(),
      endVoting: new Date('2024-09-01 00:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await expect(() => sut.execute(votingSessionId)).rejects.toThrowError(new InvalidParamError('This motion end voting has passed'))
  })
})
