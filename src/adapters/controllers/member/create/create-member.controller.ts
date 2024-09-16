import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { CreateMemberUseCaseInterface } from '@/domain/usecases/member/create-member-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreateMemberController implements ControllerInterface {
  constructor(private readonly usecase: CreateMemberUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.body)
      return success(201, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
