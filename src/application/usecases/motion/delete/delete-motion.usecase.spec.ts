import { DeleteMotionUseCase } from './delete-motion.usecase'
import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { InvalidParamError } from '@/shared/errors'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<MotionGatewayInterface>()

describe('UpdateMotionUseCase', () => {
  let sut: DeleteMotionUseCase
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new DeleteMotionUseCase(gateway)
    gateway.getById.mockResolvedValue({
      id: 'anyId',
      name: 'Any Name',
      description: 'Any description',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    gateway.getVotingSessionByMotionId.mockResolvedValue(null)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if id is falsy', async () => {
    const falsyValues = [undefined, null, ' ', '']
    for (const value of falsyValues) {
      let id = value as any
      await expect(() => sut.execute(id)).rejects.toThrowError(new InvalidParamError('id'))
    }
  })

  test('should call Gateway.delete once and with correct values', async () => {
    await sut.execute('anyId')
    expect(gateway.delete).toHaveBeenCalledTimes(1)
    expect(gateway.delete).toHaveBeenCalledWith('anyId', new Date())
  })

  test('should call Gateway.getById once and with correct id', async () => {
    await sut.execute('anyId')
    expect(gateway.getById).toHaveBeenCalledTimes(1)
    expect(gateway.getById).toHaveBeenCalledWith('anyId')
  })

  test('should call Gateway.getVotingSessionByMotionId once and with correct id', async () => {
    await sut.execute('anyId')
    expect(gateway.getVotingSessionByMotionId).toHaveBeenCalledTimes(1)
    expect(gateway.getVotingSessionByMotionId).toHaveBeenCalledWith('anyId')
  })

  test('should throw if Gateway.getById returns null', async () => {
    gateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute('anyId')).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should throw if motion voting has a vote', async () => {
    gateway.getVotingSessionByMotionId.mockResolvedValueOnce({
      id: 'motionVotingId',
      motionId: 'anyId',
      startVoting: new Date(),
      endVoting: new Date('2050-12-31 23:59:59'),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await expect(() => sut.execute('anyId')).rejects.toThrowError(new InvalidParamError('This motion has a vote'))
  })
})
