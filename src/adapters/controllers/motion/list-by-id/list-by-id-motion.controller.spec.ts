import { HttpRequest } from '@/domain/controllers/controller.interface'
import { ListMotionByIdController } from './list-by-id-motion.controller'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { ListMotionByIdUseCaseInterface } from '@/domain/usecases/motion/list-by-id-motion-usecase.interface'

const usecase = mock<ListMotionByIdUseCaseInterface>()
const fakeMotion = {
  id: 'anyId',
  name: 'Any Name',
  description: 'Any description',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('ListMotionByIdController', () => {
  let sut: ListMotionByIdController
  let input: HttpRequest

  beforeEach(() => {
    sut = new ListMotionByIdController(usecase)
    input = {
      params: {
        id: 'anyId'
      }
    }
    usecase.execute.mockResolvedValue(fakeMotion)
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith('anyId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakeMotion })
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
