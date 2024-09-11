import { UpdateMotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { UpdateMotionGatewayInterface } from '@/domain/gateways/motion/update-motion-gateway.interface'
import { UpdateMotionUseCase } from './update-motion.usecase'
import { InvalidParamError } from '@/shared/errors'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<UpdateMotionGatewayInterface>()

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
})
