import { UpdateMotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { MotionGatewayInterface } from '@/domain/gateways/motion.gateway'
import { UpdateMotionUseCaseInterface } from '@/domain/usecases/motion/update-motion-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class UpdateMotionUseCase implements UpdateMotionUseCaseInterface {
  constructor(private readonly gateway: MotionGatewayInterface) {}
  async execute(input: UpdateMotionInputDTO): Promise<void> {
    await this.validate(input)
    await this.gateway.update({ ...input, updatedAt: new Date() })
  }

  async validate(input: UpdateMotionInputDTO): Promise<void> {
    const { id, name, description } = input

    if (!isValidString(id)) {
      throw new InvalidParamError('id')
    }

    const motionExists = await this.gateway.getById(id)

    if (!motionExists) {
      throw new InvalidParamError('id')
    }

    const motionVoting = await this.gateway.getMotionVotingById(id)
    if (motionVoting && new Date(motionVoting.endVoting) < new Date()) {
      throw new InvalidParamError('Motion voting is finished')
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
