import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { UpdateMotionUseCaseInterface } from '@/domain/usecases/motion/update-motion-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class UpdateMotionController implements ControllerInterface {
  constructor(private readonly usecase: UpdateMotionUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const usecaseInput = {
        id: input?.params?.id,
        name: input?.body?.name,
        description: input?.body?.description
      }
      await this.usecase.execute(usecaseInput)
      return success(200, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
