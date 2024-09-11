import { MotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { CreateMotionUseCase } from './create-motion.usecase'
import { MotionEntity } from '@/domain/entities/motion/motion.entity'
import { MotionGatewayInterface } from '@/domain/gateways/motion.gateway'
import { mock } from 'jest-mock-extended'

const gateway = mock<MotionGatewayInterface>()
const fakeMotionEntity = {
  id: 'AnyId',
  name: 'Any Name',
  description: 'Any description',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('CreateMotionUseCase', () => {
  let sut: CreateMotionUseCase
  let input: MotionInputDTO

  beforeEach(() => {
    sut = new CreateMotionUseCase(gateway)
    input = {
      name: 'Any Name',
      description: 'Any description'
    }

    jest.spyOn(MotionEntity, 'build').mockReturnValue(fakeMotionEntity)
  })

  test('should call build method of MotionEntity once and with correct values', async () => {
    const spy = jest.spyOn(MotionEntity, 'build')
    await sut.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: input.name,
      description: input.description
    })
  })

  test('should call Gateway.save once and with correct values', async () => {
    await sut.execute(input)
    expect(gateway.save).toHaveBeenCalledTimes(1)
    expect(gateway.save).toHaveBeenCalledWith(fakeMotionEntity)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ id: 'AnyId' })
  })
})
