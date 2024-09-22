import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { VotingUseCaseInterface } from '@/domain/usecases/voting_session/voting.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreateVotingController implements ControllerInterface {
  readonly controllerName: string = 'CreateVoting'
  constructor(private readonly usecase: VotingUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.usecase.execute(input?.body)
      return success(201, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
