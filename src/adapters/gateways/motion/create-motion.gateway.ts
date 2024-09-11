import { CreateMotionGatewayInputDTO, CreateMotionGatewayInterface } from '@/domain/gateways/motion/create-motion-gateway.interface'
import { prismaClient } from '../prisma-client'

export class CreateMotionGateway implements CreateMotionGatewayInterface {
  async save(data: CreateMotionGatewayInputDTO): Promise<void> {
    await prismaClient.motion.create({ data })
  }
}
