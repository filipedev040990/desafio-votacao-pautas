import { MotionInputDTO } from '@/domain/entities/motion/motion.dto'

export interface CreateMotionUseCaseInterface {
  execute: (input: MotionInputDTO) => Promise<{ id: string }>
}
