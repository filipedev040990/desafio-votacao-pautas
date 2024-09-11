import { UpdateMotionGatewayInterface, UpdateMotionGatewayInputDTO } from '@/domain/gateways/motion/update-motion-gateway.interface'
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
}
