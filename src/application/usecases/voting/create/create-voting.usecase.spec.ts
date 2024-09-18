import { VotingUseCaseInputDTO } from '@/domain/usecases/voting_session/voting.interface'
import { VotingUseCase } from './create-voting.usecase'
import { VotingGatewayInterface } from '@/domain/gateways/voting-gateway.interface'
import { MemberGatewayInterface } from '@/domain/gateways/member-gateway.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session-gateway.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const votingGateway = mock<VotingGatewayInterface>()
const memberGateway = mock<MemberGatewayInterface>()
const votingSessinoGateway = mock<VotingSessionGatewayInterface>()
const fakeMemberEntity = {
  id: 'anyMemberId',
  name: 'Any Name',
  document: 'Any document',
  createdAt: new Date(),
  updatedAt: new Date()
}
const fakeVotingSession = {
  id: 'anyVotingSessoionId',
  motionId: 'anyMotionId',
  startVoting: new Date(),
  endVoting: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
}

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyId')
}))

let sut: VotingUseCase
let input: VotingUseCaseInputDTO

describe('CreateVotingSessionUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new VotingUseCase(votingGateway, memberGateway, votingSessinoGateway)
    input = {
      memberId: 'anyMemberId',
      votingSessionId: 'anyVotingSessoionId',
      votingValue: 'Sim'
    }
    memberGateway.getById.mockResolvedValue(fakeMemberEntity)
    votingSessinoGateway.getById.mockResolvedValue(fakeVotingSession)
    votingGateway.getByMemberAndVotingSession.mockResolvedValue(null)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if memberId is not provided', async () => {
    input.memberId = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('memberId'))
  })

  test('should throw if MemberGateway.getById returns null', async () => {
    memberGateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('memberId'))
  })

  test('should throw if votingSessionId is not provided', async () => {
    input.votingSessionId = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('votingSessionId'))
  })

  test('should throw if VotingSessionGateway.getById returns null', async () => {
    votingSessinoGateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('votingSessionId'))
  })

  test('should throw if votingValue is not provided', async () => {
    input.votingValue = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('votingValue'))
  })

  test('should throw if a invalid votingValue is provided', async () => {
    input.votingValue = 'invalid'
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('votingValue'))
  })

  test('should call VotingGateway.getByMemberAndVotingSession once and with correct values', async () => {
    await sut.execute(input)
    expect(votingGateway.getByMemberAndVotingSession).toHaveBeenCalledTimes(1)
    expect(votingGateway.getByMemberAndVotingSession).toHaveBeenCalledWith('anyMemberId', 'anyVotingSessoionId')
  })

  test('should throw if member already voted', async () => {
    votingGateway.getByMemberAndVotingSession.mockResolvedValueOnce({
      id: 'anyId',
      memberId: 'anyMemberId',
      votingSessionId: 'anyVotingSessoionId',
      votingValue: '',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('Member already voted'))
  })

  test('should call VotingGateway.save once and with correct values', async () => {
    await sut.execute(input)
    expect(votingGateway.save).toHaveBeenCalledTimes(1)
    expect(votingGateway.save).toHaveBeenCalledWith({
      id: 'anyId',
      memberId: 'anyMemberId',
      votingSessionId: 'anyVotingSessoionId',
      votingValue: 'Sim',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})
