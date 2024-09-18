import { HttpRequest } from '@/domain/controllers/controller.interface'
import { VoteCountUseCaseInterface } from '@/domain/usecases/voting_session/vote-count.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { VoteCountController } from './vote-count.controller'
import { mock } from 'jest-mock-extended'

const usecase = mock<VoteCountUseCaseInterface>()
const fakeVotes = {
  motion: {
    name: 'anyMotion',
    description: 'anyMotionDescription'
  },
  session: {
    start: '01/09/2024 - 15:00:00',
    end: '03/09/2024 - 15:00:00'
  },
  values: [
    {
      value: 'Sim',
      total: 70,
      percent: 70
    },
    {
      value: 'Não',
      total: 30,
      percent: 30
    }
  ],
  totalVotes: 100
}

describe('VoteCountController', () => {
  let sut: VoteCountController
  let input: HttpRequest

  beforeEach(() => {
    sut = new VoteCountController(usecase)
    input = {
      params: {
        id: 'anyVotingSessionId'
      }
    }
    usecase.execute.mockResolvedValue(fakeVotes)
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith('anyVotingSessionId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: fakeVotes })
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
