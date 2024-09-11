import { CreateMotionGatewayInputDTO, MotionGatewayInterface } from '@/domain/gateways/motion/create-motion-gateway.interface'
import { prismaClient } from '../prisma-client'

export class CreateMotionGateway implements MotionGatewayInterface {
  async save(data: CreateMotionGatewayInputDTO): Promise<void> {
    await prismaClient.motion.create({ data })
  }
}
