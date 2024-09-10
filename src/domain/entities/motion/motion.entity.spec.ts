import { InvalidParamError } from '@/shared/errors'
import { MotionInputDTO } from './motion.dto'
import { MotionEntity } from './motion.entity'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyId')
}))

describe('MotionEntity', () => {
  let sut: any
  let input: MotionInputDTO

  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = MotionEntity
    input = {
      name: 'Any Name',
      description: 'Any description'
    }
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if name is falsy', () => {
    const falsyValues = [undefined, null, ' ', '']
    for (const value of falsyValues) {
      input.name = value as any
      expect(() => sut.build(input)).toThrowError(new InvalidParamError('name'))
    }
  })

  test('should throw if description is falsy', () => {
    const falsyValues = [undefined, null, ' ', '']
    for (const value of falsyValues) {
      input.description = value as any
      expect(() => sut.build(input)).toThrowError(new InvalidParamError('description'))
    }
  })

  test('should return a correct Entity', () => {
    const entity = sut.build(input)
    expect(entity).toEqual({
      id: 'anyId',
      name: 'Any Name',
      description: 'Any description',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})
