import { UpdateMotionInputDTO } from '@/domain/entities/motion/motion.dto'

export interface UpdateMotionUseCaseInterface {
  execute: (input: UpdateMotionInputDTO) => Promise<void>
}
