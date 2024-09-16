import { CreateVotingSessionInputDTO } from '@/domain/usecases/voting_session/create-voting-session.interface'
import { CreateVotingSessionUseCase } from './create-voting-session.usecase'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { MotionGatewayInterface } from '@/domain/gateways/motion.gateway'
import { VotingSessionGatewayInterface } from '@/domain/gateways/voting-session.gateway'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyId')
}))

const motionGateway = mock<MotionGatewayInterface>()
const votingSessionGateway = mock<VotingSessionGatewayInterface>()
const fakeMotion = {
  id: 'anyId',
  name: 'Any Name',
  description: 'Any description',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('CreateVotingSessionUseCase', () => {
  let sut: CreateVotingSessionUseCase
  let input: CreateVotingSessionInputDTO
  let nowOneMoreOneHour: Date
  let now: Date

  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new CreateVotingSessionUseCase(motionGateway, votingSessionGateway)
    now = new Date()
    nowOneMoreOneHour = new Date(now.setHours(now.getHours() + 1))
    input = {
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: nowOneMoreOneHour
    }
    motionGateway.getById.mockResolvedValue(fakeMotion)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if motionId is falsy', async () => {
    input.motionId = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('motionId'))
  })

  test('should call MotionGateway.getById once and with correct motionId', async () => {
    await sut.execute(input)
    expect(motionGateway.getById).toBeCalledTimes(1)
    expect(motionGateway.getById).toBeCalledWith('anyMotionId')
  })

  test('should throw if MotionGateway.getById returns null', async () => {
    motionGateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('Motion not found'))
  })

  test('should throw if startVoting is falsy', async () => {
    input.startVoting = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('startVoting'))
  })

  test('should throw if startVoting has passed', async () => {
    input.startVoting = new Date('2020-01-01 00:00:00')
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('startVoting'))
  })

  test('should throw if endVoting is provided and is invalid', async () => {
    input.endVoting = new Date('2020-01-01 00:00:00')
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('endVoting'))
  })

  test('should call VotingSessionGateway.save once and with correct values', async () => {
    await sut.execute(input)
    expect(votingSessionGateway.save).toHaveBeenCalledTimes(1)
    expect(votingSessionGateway.save).toHaveBeenCalledWith({
      id: 'anyId',
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: nowOneMoreOneHour,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  test('should call VotingSessionGateway.save once and with correct values when endVoting is not provided', async () => {
    await sut.execute({
      motionId: 'anyMotionId',
      startVoting: now
    })

    const nowOneMoreOneMinute = new Date(new Date().setMinutes(new Date().getMinutes() + 1))

    expect(votingSessionGateway.save).toHaveBeenCalledTimes(1)
    expect(votingSessionGateway.save).toHaveBeenCalledWith({
      id: 'anyId',
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: nowOneMoreOneMinute,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  test('should return a correct output', async () => {
    const output = await sut.execute({
      motionId: 'anyMotionId',
      startVoting: now
    })

    const nowOneMoreOneMinute = new Date(new Date().setMinutes(new Date().getMinutes() + 1))
    expect(output).toEqual({
      id: 'anyId',
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: nowOneMoreOneMinute,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  test('should return a correct output', async () => {
    const output = await sut.execute({
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: new Date('2050-12-31 12:15:50')
    })

    expect(output).toEqual({
      id: 'anyId',
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: new Date('2050-12-31 12:15:50'),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})