import { HttpRequest } from '@/domain/controllers/controller.interface'
import { VoteCountUseCaseInterface } from '@/domain/usecases/voting_session/vote-count.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { VoteCountController } from './vote-count.controller'
import { mock } from 'jest-mock-extended'

const usecase = mock<VoteCountUseCaseInterface>()
const fakeVotes = {
  motion: {
    name: 'Inclusão de seguro de vida',
    description: 'Pauta para discutir a inclusão de seguro de vida'
  },
  session: {
    start: new Date('2024-09-16T17:00:00.000Z'),
    end: new Date('2024-09-16T16:59:59.000Z')
  },
  values: {
    Sim: {
      total: 2,
      percent: 66.66666666666667
    },
    Não: {
      total: 1,
      percent: 33.333333333333336
    }
  },
  total: 3
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
    expect(output).toEqual({ statusCode: 200, body: fakeVotes })
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
