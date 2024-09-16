import { InvalidParamError } from '@/shared/errors'
import { MemberInputDTO } from './member.dto'
import { MemberEntity } from './member.entity'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyId')
}))

describe('MemberEntity', () => {
  let sut: any
  let input: MemberInputDTO

  beforeEach(() => {
    sut = MemberEntity
    input = {
      name: 'Any Name',
      document: '05441653060'
    }
  })

  test('should throws if name is not provided', () => {
    input.name = undefined as any
    expect(() => sut.build(input)).toThrowError(new InvalidParamError('name'))
  })

  test('should throws if document is not provided', () => {
    input.document = undefined as any
    expect(() => sut.build(input)).toThrowError(new InvalidParamError('document'))
  })

  test('should throws if a invalid document is provided', () => {
    input.document = 'invalid' as any
    expect(() => sut.build(input)).toThrowError(new InvalidParamError('document'))
  })

  test('should return a correct Entity', () => {
    const entity = sut.build(input)
    expect(entity).toEqual({
      id: 'anyId',
      name: 'Any Name',
      document: '05441653060',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})
