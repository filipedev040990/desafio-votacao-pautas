import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { ListMotionsUseCaseInterface } from '@/domain/usecases/motion/list-motions-usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class ListMotionsController implements ControllerInterface {
  readonly controllerName: string = 'ListMotions'
  constructor(private readonly usecase: ListMotionsUseCaseInterface) {}
  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute()
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
