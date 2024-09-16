import { MemberGatewayInterface } from '@/domain/gateways/member-gateway.interface'
import { UpdateMemberInputDTO } from '@/domain/entities/member/member.dto'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { UpdateMemberUseCase } from './update-member.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<MemberGatewayInterface>()
const fakeMemberEntity = {
  id: 'anyId',
  name: 'Any Name',
  document: '50682516074',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('UpdateMemberUseCase', () => {
  let sut: UpdateMemberUseCase
  let input: UpdateMemberInputDTO

  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new UpdateMemberUseCase(gateway)
    input = {
      id: 'anyId',
      name: 'New Name',
      document: '50682516074'
    }

    gateway.getByDocument.mockResolvedValue(null)
    gateway.getById.mockResolvedValue(fakeMemberEntity)
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if id is not provided', async () => {
    input.id = undefined as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new MissingParamError('id'))
  })

  test('should call Gateway.getById once and with correct document', async () => {
    await sut.execute(input)
    expect(gateway.getById).toHaveBeenCalledTimes(1)
    expect(gateway.getById).toHaveBeenCalledWith('anyId')
  })

  test('should throw if Gateway.getById returns null', async () => {
    gateway.getById.mockResolvedValueOnce(null)
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should throw if a invalid name is provided', async () => {
    input.name = ' ' as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('name'))
  })

  test('should throw if a invalid document is provided', async () => {
    input.document = 'invalid' as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('document'))
  })

  test('should throw if a document already exists for another member', async () => {
    gateway.getByDocument.mockResolvedValueOnce({
      id: 'anoTherId',
      name: 'Any Name',
      document: '45874802070',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('This document already in use'))
  })

  test('should throw if name and document are not provided', async () => {
    input = { id: 'anyId' } as any
    await expect(() => sut.execute(input)).rejects.toThrowError(new InvalidParamError('Provided a field to update'))
  })

  test('should call Gateway.getByDocument once and with correct document', async () => {
    await sut.execute(input)
    expect(gateway.getByDocument).toHaveBeenCalledTimes(1)
    expect(gateway.getByDocument).toHaveBeenCalledWith('50682516074')
  })

  test('should call Gateway.update once and with correct values', async () => {
    await sut.execute(input)
    expect(gateway.update).toHaveBeenCalledTimes(1)
    expect(gateway.update).toHaveBeenCalledWith({
      id: 'anyId',
      name: 'New Name',
      document: '50682516074',
      updatedAt: new Date()
    })
  })
})
