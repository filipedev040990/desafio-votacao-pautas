import { HttpRequest } from '@/domain/controllers/controller.interface'
import { DeleteMotionController } from './delete-motion.controller'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { DeleteMotionUseCaseInterface } from '@/domain/usecases/motion/delete-motion-usecase.interface'
import { mock } from 'jest-mock-extended'

const usecase = mock<DeleteMotionUseCaseInterface>()

describe('DeleteMotionController', () => {
  let sut: DeleteMotionController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteMotionController(usecase)
    input = {
      params: {
        id: 'anyId'
      }
    }
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith('anyId')
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
