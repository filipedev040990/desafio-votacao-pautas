import { HttpRequest } from '@/domain/controllers/controller.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { CreateMemberController } from './create-member.controller'
import { CreateMemberUseCaseInterface } from '@/domain/usecases/member/create-member-usecase.interface'
import { mock } from 'jest-mock-extended'

const usecase = mock<CreateMemberUseCaseInterface>()

describe('CreateMemberController', () => {
  let sut: CreateMemberController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateMemberController(usecase)
    input = {
      body: {
        name: 'Any Name',
        document: 'Any document'
      }
    }
    usecase.execute.mockResolvedValue({ id: 'anyId' })
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith(input.body)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: { id: 'anyId' } })
  })

  test('should return a correct error if CreateOwnerUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
