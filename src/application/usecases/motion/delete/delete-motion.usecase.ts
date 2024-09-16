import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { DeleteMotionUseCaseInterface } from '@/domain/usecases/motion/delete-motion-usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class DeleteMotionUseCase implements DeleteMotionUseCaseInterface {
  constructor(private readonly gateway: MotionGatewayInterface) {}
  async execute(id: string): Promise<void> {
    await this.validate(id)
    await this.gateway.delete(id, new Date())
  }

  async validate(id: string): Promise<void> {
    if (!isValidString(id)) {
      throw new InvalidParamError('id')
    }

    const motionExists = await this.gateway.getById(id)

    if (!motionExists) {
      throw new InvalidParamError('id')
    }

    const motionVoting = await this.gateway.getVotingSessionByMotionId(id)
    if (motionVoting) {
      throw new InvalidParamError('This motion has a vote')
    }
  }
}
