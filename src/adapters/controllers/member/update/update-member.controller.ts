import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { UpdateMemberUseCaseInterface } from '@/domain/usecases/member/update-member-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class UpdateMemberController implements ControllerInterface {
  constructor(private readonly usecase: UpdateMemberUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.usecase.execute(input?.body)
      return success(200, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
