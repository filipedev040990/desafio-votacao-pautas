import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { ListMotionByIdUseCaseInterface } from '@/domain/usecases/motion/list-by-id-motion-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class ListMotionByIdController implements ControllerInterface {
  constructor(private readonly usecase: ListMotionByIdUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.params?.id)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
