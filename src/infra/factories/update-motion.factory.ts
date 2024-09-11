import { UpdateMotionController } from '@/adapters/controllers/motion/update/update-motion.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { UpdateMotionUseCase } from '@/application/usecases/motion/update/update-motion.usecase'

export const updateMotionControllerFactory = (): UpdateMotionController => {
  const gateway = new MotionGateway()
  const usecase = new UpdateMotionUseCase(gateway)
  return new UpdateMotionController(usecase)
}
