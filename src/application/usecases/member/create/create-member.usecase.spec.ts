import { CreateMemberUseCase } from './create-member.usecase'
import { MemberGatewayInterface } from '@/domain/gateways/member-gateway.interface'
import { MemberInputDTO } from '@/domain/entities/member/member.dto'
import { MemberEntity } from '@/domain/entities/member/member.entity'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'

const gateway = mock<MemberGatewayInterface>()
const fakeMemberEntity = {
  id: 'AnyId',
  name: 'Any Name',
  document: 'Any document',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('CreateMemberUseCase', () => {
  let sut: CreateMemberUseCase
  let input: MemberInputDTO

  beforeEach(() => {
    sut = new CreateMemberUseCase(gateway)
    input = {
      name: 'Any Name',
      document: 'Any document'
    }

    jest.spyOn(MemberEntity, 'build').mockReturnValue(fakeMemberEntity)
    gateway.getByDocument.mockResolvedValue(null)
  })

  test('should call build method of MemberEntity once and with correct values', async () => {
    const spy = jest.spyOn(MemberEntity, 'build')
    await sut.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: input.name,
      document: input.document
    })
  })

  test('should call Gateway.save once and with correct values', async () => {
    await sut.execute(input)
    expect(gateway.save).toHaveBeenCalledTimes(1)
    expect(gateway.save).toHaveBeenCalledWith(fakeMemberEntity)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ id: 'AnyId' })
  })

  test('should call Gateway.getByDocument once and with correct document', async () => {
    await sut.execute(input)
    expect(gateway.getByDocument).toHaveBeenCalledTimes(1)
    expect(gateway.getByDocument).toHaveBeenCalledWith('Any document')
  })

  test('should throws if document already exists', async () => {
    gateway.getByDocument.mockResolvedValueOnce(fakeMemberEntity)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('This document already exists'))
  })
})
