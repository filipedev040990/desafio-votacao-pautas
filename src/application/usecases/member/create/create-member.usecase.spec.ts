import { CreateMemberUseCase } from './create-member.usecase'
import { MemberGatewayInterface } from '@/domain/gateways/member.gateway.interface'
import { MemberInputDTO } from '@/domain/entities/member/member.dto'
import { MemberEntity } from '@/domain/entities/member/member.entity'
import { mock } from 'jest-mock-extended'

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
})
