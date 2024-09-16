import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { ListMotionByIdUseCaseInterface, ListMotionOutputDTO } from '@/domain/usecases/motion/list-by-id-motion-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class ListMotionByIdUseCase implements ListMotionByIdUseCaseInterface {
  constructor(private readonly gateway: MotionGatewayInterface) {}
  async execute(id: string): Promise<ListMotionOutputDTO | null> {
    if (!isValidString(id)) {
      throw new InvalidParamError('id')
    }

    const motion = await this.gateway.getById(id)

    if (!motion) {
      throw new InvalidParamError('id')
    }
    return motion
  }
}
