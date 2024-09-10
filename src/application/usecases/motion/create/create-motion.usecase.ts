import { MotionInputDTO } from '@/domain/entities/motion/motion.dto'
import { MotionEntity } from '@/domain/entities/motion/motion.entity'
import { CreateMotionGatewayInterface } from '@/domain/gateways/motion/create-motion-gateway.interface'
import { CreateMotionUseCaseInterface } from '@/domain/usecases/motion/create-motion-usecase.interface'

export class CreateMotionUseCase implements CreateMotionUseCaseInterface {
  constructor(private readonly gateway: CreateMotionGatewayInterface) {}
  async execute(input: MotionInputDTO): Promise<{ id: string }> {
    const motion = MotionEntity.build(input)
    await this.gateway.save(motion)
    return { id: motion.id }
  }
}
