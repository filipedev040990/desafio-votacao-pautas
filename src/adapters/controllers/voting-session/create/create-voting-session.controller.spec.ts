import { HttpRequest } from '@/domain/controllers/controller.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { CreateVotingSessionController } from './create-voting-session.controller'
import { CreateVotingSessionOutputDTO, CreateVotingSessionUseCaseInterface } from '@/domain/usecases/voting_session/create-voting-session.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const usecase = mock<CreateVotingSessionUseCaseInterface>()

describe('CreateVotingSessionController', () => {
  let sut: CreateVotingSessionController
  let input: HttpRequest
  let now: Date
  let nowOneMoreOneHour: Date
  let fakeVotingSession: CreateVotingSessionOutputDTO

  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeEach(() => {
    sut = new CreateVotingSessionController(usecase)
    now = new Date()
    nowOneMoreOneHour = new Date(now.setHours(now.getHours() + 1))
    input = {
      body: {
        motionId: 'anyMotionId',
        startVoting: now,
        endVoting: nowOneMoreOneHour
      }
    }
    fakeVotingSession = {
      id: 'anyId',
      motionId: 'anyMotionId',
      startVoting: now,
      endVoting: nowOneMoreOneHour,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    usecase.execute.mockResolvedValue(fakeVotingSession)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call usecase.execute once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toBeCalledTimes(1)
    expect(usecase.execute).toBeCalledWith(input.body)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakeVotingSession })
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
