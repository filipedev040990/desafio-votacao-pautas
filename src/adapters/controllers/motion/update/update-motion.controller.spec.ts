import { HttpRequest } from '@/domain/controllers/controller.interface'
import { UpdateMotionController } from './update-motion.controller'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { UpdateMotionUseCaseInterface } from '@/domain/usecases/motion/update-motion-usecase.interface'
import { mock } from 'jest-mock-extended'

const usecase = mock<UpdateMotionUseCaseInterface>()

describe('UpdateMotionController', () => {
  let sut: UpdateMotionController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateMotionController(usecase)
    input = {
      params: {
        id: 'anyId'
      },
      body: {
        name: 'Any Name',
        description: 'Any Description'
      }
    }
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith({
      id: 'anyId',
      name: 'Any Name',
      description: 'Any Description'
    })
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
