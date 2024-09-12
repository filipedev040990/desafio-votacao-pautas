import { MotionGatewayInterface } from '@/domain/gateways/motion.gateway'
import { InvalidParamError } from '@/shared/errors'
import { ListMotionsUseCase } from './list-motions.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<MotionGatewayInterface>()
const fakeMotions = [
  {
    id: 'anyId',
    name: 'Any Name',
    description: 'Any description',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'anotherId',
    name: 'Another Name',
    description: 'Another description',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
describe('ListMotionsUseCase', () => {
  let sut: ListMotionsUseCase
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new ListMotionsUseCase(gateway)
    gateway.list.mockResolvedValue(fakeMotions)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should call Gateway.list once', async () => {
    await sut.execute()
    expect(gateway.list).toHaveBeenCalledTimes(1)
  })

  test('should return a correct response', async () => {
    const output = await sut.execute()
    expect(output).toEqual(fakeMotions)
  })

  test('should return a correct response', async () => {
    gateway.list.mockResolvedValueOnce(null)
    const output = await sut.execute()
    expect(output).toEqual(null)
  })
})
