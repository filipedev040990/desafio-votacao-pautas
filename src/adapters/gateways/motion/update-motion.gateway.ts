import {
  UpdateMotionGatewayInterface,
  UpdateMotionGatewayInputDTO,
  MotionGatewayOutputDTO,
  MotionVotingOutoutDTO
} from '@/domain/gateways/motion/update-motion-gateway.interface'
import { prismaClient } from '../prisma-client'

export class UpdateMotionGateway implements UpdateMotionGatewayInterface {
  async update(input: UpdateMotionGatewayInputDTO): Promise<void> {
    const data: { name?: string; description?: string } = {}

    if (input?.name) {
      data.name = input.name
    }

    if (input?.description) {
      data.description = input.description
    }

    await prismaClient.motion.update({
      where: {
        id: input.id
      },
      data
    })
  }

  async getById(id: string): Promise<MotionGatewayOutputDTO | null> {
    const motion = await prismaClient.motion.findFirst({ where: { id } })
    return motion ?? null
  }

  async getMotionVotingById(id: string): Promise<MotionVotingOutoutDTO | null> {
    const motionVoting = await prismaClient.motionVoting.findFirst({ where: { motionId: id } })
    return motionVoting ?? null
  }
}
