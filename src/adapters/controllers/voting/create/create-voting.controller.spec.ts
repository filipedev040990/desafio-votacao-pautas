import { HttpRequest } from '@/domain/controllers/controller.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { VotingUseCaseInterface } from '@/domain/usecases/voting_session/voting.interface'
import { CreateVotingController } from './create-voting.controller'
import { mock } from 'jest-mock-extended'

const usecase = mock<VotingUseCaseInterface>()

describe('CreateVotingController', () => {
  let sut: CreateVotingController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateVotingController(usecase)
    input = {
      body: {
        memberId: 'anyMemberId',
        votingSessionId: 'anyVotingSessionId',
        votingValue: 'Sim'
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
    expect(output).toEqual({ statusCode: 201, body: null })
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
