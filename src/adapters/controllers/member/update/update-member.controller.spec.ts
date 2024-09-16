import { HttpRequest } from '@/domain/controllers/controller.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { UpdateMemberController } from './update-member.controller'
import { UpdateMemberUseCaseInterface } from '@/domain/usecases/member/update-member-usecase.interface'
import { mock } from 'jest-mock-extended'

const usecase = mock<UpdateMemberUseCaseInterface>()

describe('UpdateMemberController', () => {
  let sut: UpdateMemberController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateMemberController(usecase)
    input = {
      body: {
        id: 'anyId',
        name: 'Any Name',
        document: 'Any document'
      }
    }
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith(input.body)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: null })
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
