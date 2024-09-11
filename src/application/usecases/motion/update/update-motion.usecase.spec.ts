import { UpdateMotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { UpdateMotionUseCase } from './update-motion.usecase'
import { InvalidParamError } from '@/shared/errors'
import { MotionGatewayInterface } from '@/domain/gateways/motion.gateway'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<MotionGatewayInterface>()

describe('UpdateMotionUseCase', () => {
  let sut: UpdateMotionUseCase
  let input: UpdateMotionInputDTO
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new UpdateMotionUseCase(gateway)
    input = {
      id: 'anyId',
      name: 'Any Name',
      description: 'Any description'
    }
    gateway.getById.mockResolvedValue({
      id: 'anyId',
      name: 'Any Name',
      description: 'Any description',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    gateway.getMotionVotingById.mockResolvedValue({
      id: 'motionVotingId',
      motionId: 'anyId',
      startVoting: new Date(),
      endVoting: new Date('2050-12-31 23:59:59'),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if id is falsy', async () => {
    const falsyValues = [undefined, null, ' ', '']
    for (const value of falsyValues) {
      input.id = value as any
      await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('id'))
    }
  })

  test('should throw if name is falsy', async () => {
    const falsyValues = [' ', '']
    for (const value of falsyValues) {
      input.name = value as any
      await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('name'))
    }
  })

  test('should throw if description is falsy', async () => {
    const falsyValues = [' ', '']
    for (const value of falsyValues) {
      input.description = value as any
      await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('description'))
    }
  })

  test('should call Gateway.update once and with correct values', async () => {
    await sut.execute(input)
    expect(gateway.update).toHaveBeenCalledTimes(1)
    expect(gateway.update).toHaveBeenCalledWith({
      id: 'anyId',
      name: 'Any Name',
      description: 'Any description',
      updatedAt: new Date()
    })
  })

  test('should call Gateway.getById once and with correct id', async () => {
    await sut.execute(input)
    expect(gateway.getById).toHaveBeenCalledTimes(1)
    expect(gateway.getById).toHaveBeenCalledWith('anyId')
  })

  test('should call Gateway.getMotionVotingById once and with correct id', async () => {
    await sut.execute(input)
    expect(gateway.getMotionVotingById).toHaveBeenCalledTimes(1)
    expect(gateway.getMotionVotingById).toHaveBeenCalledWith('anyId')
  })

  test('should throw if Gateway.getById returns null', async () => {
    gateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should throw if motion voting is finished', async () => {
    gateway.getMotionVotingById.mockResolvedValueOnce({
      id: 'motionVotingId',
      motionId: 'anyId',
      startVoting: new Date(),
      endVoting: new Date('2000-12-31 23:59:59'),
      createdAt: new Date('2000-12-20 23:59:59'),
      updatedAt: new Date('2000-12-20 23:59:59')
    })
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('Motion voting is finished'))
  })

  test('should throw if no field is provided', async () => {
    input.name = undefined
    input.description = undefined
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('Provided a field to update'))
  })
})
