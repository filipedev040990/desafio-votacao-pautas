import { UpdateMotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { UpdateMotionGatewayInterface } from '@/domain/gateways/motion/update-motion-gateway.interface'
import { UpdateMotionUseCaseInterface } from '@/domain/usecases/motion/update-motion-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class UpdateMotionUseCase implements UpdateMotionUseCaseInterface {
  constructor(private readonly gateway: UpdateMotionGatewayInterface) {}
  async execute(input: UpdateMotionInputDTO): Promise<void> {
    this.validate(input)
    await this.gateway.update({ ...input, updatedAt: new Date() })
  }

  validate(input: UpdateMotionInputDTO): void {
    const { id, name, description } = input

    if (!isValidString(id)) {
      throw new InvalidParamError('id')
    }

    if (!name && !description) {
      throw new InvalidParamError('Provided a field to update')
    }

    if (name !== undefined && !isValidString(name)) {
      throw new InvalidParamError('name')
    }

    if (description !== undefined && !isValidString(description)) {
      throw new InvalidParamError('description')
    }
  }
}