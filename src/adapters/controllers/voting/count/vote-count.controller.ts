import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { VoteCountUseCaseInterface } from '@/domain/usecases/voting_session/vote-count.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class VoteCountController implements ControllerInterface {
  readonly controllerName: string = 'VoteCount'
  constructor(private readonly usecase: VoteCountUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.params?.id)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
