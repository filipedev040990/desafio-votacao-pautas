import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { DeleteMotionUseCaseInterface } from '@/domain/usecases/motion/delete-motion-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class DeleteMotionController implements ControllerInterface {
  constructor(private readonly usecase: DeleteMotionUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.usecase.execute(input?.params?.id)
      return success(200, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
