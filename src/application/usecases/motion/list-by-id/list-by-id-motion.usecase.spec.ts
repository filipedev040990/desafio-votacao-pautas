import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { ListMotionByIdUseCase } from './list-by-id-motion.usecase'
import { InvalidParamError } from '@/shared/errors'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<MotionGatewayInterface>()
const fakeMotion = {
  id: 'anyId',
  name: 'Any Name',
  description: 'Any description',
  createdAt: new Date(),
  updatedAt: new Date()
}
describe('ListMotionByIdUseCase', () => {
  let sut: ListMotionByIdUseCase
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new ListMotionByIdUseCase(gateway)
    gateway.getById.mockResolvedValue(fakeMotion)
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

  test('should call Gateway.getById once and with correct id', async () => {
    await sut.execute('anyId')
    expect(gateway.getById).toHaveBeenCalledTimes(1)
    expect(gateway.getById).toHaveBeenCalledWith('anyId')
  })

  test('should throw if Gateway.getById returns null', async () => {
    gateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute('anyId')).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should return a correct response', async () => {
    const output = await sut.execute('anyId')
    expect(output).toEqual(fakeMotion)
  })
})
