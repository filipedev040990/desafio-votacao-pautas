import { HttpRequest } from '@/domain/controllers/controller.interface'
import { CreateMotionController } from './create-motion.controller'
import { mock } from 'jest-mock-extended'
import { CreateMotionUseCaseInterface } from '@/domain/usecases/motion/create-motion-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const usecase = mock<CreateMotionUseCaseInterface>()

describe('CreateMotionController', () => {
  let sut: CreateMotionController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateMotionController(usecase)
    input = {
      body: {
        name: 'Any Name',
        description: 'Any Description'
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
