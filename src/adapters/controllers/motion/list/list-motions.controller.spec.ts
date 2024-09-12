import { HttpRequest } from '@/domain/controllers/controller.interface'
import { ListMotionsController } from './list-motions.controller'
import { ListMotionsUseCaseInterface } from '@/domain/usecases/motion/list-motions-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { mock } from 'jest-mock-extended'

const usecase = mock<ListMotionsUseCaseInterface>()
const fakeMotions = [
  {
    id: 'anyId',
    name: 'Any Name',
    description: 'Any description',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'anotherId',
    name: 'Another Name',
    description: 'Another description',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

describe('ListMotionsController', () => {
  let sut: ListMotionsController

  beforeEach(() => {
    sut = new ListMotionsController(usecase)
    usecase.execute.mockResolvedValue(fakeMotions)
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute()
    expect(usecase.execute).toBeCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute()
    expect(output).toEqual({ statusCode: 200, body: fakeMotions })
  })

  test('should return a correct error if CreateOwnerUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute()

    expect(output).toEqual(badRequest(error))
  })
})
