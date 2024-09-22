import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { CreateMotionUseCaseInterface } from '@/domain/usecases/motion/create-motion-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreateMotionController implements ControllerInterface {
  readonly controllerName: string = 'CreateMotion'
  constructor(private readonly usecase: CreateMotionUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.body)
      return success(201, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
