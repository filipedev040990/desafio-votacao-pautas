import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { CreateVotingSessionUseCaseInterface } from '@/domain/usecases/voting_session/create-voting-session.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreateVotingSessionController implements ControllerInterface {
  readonly controllerName: string = 'CreateVotingSession'
  constructor(private readonly usecase: CreateVotingSessionUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.body)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
