import { UpdateMotionController } from '@/adapters/controllers/motion/update/update-motion.controller'
import { UpdateMotionGateway } from '@/adapters/gateways/motion/update-motion.gateway'
import { UpdateMotionUseCase } from '@/application/usecases/motion/update/update-motion.usecase'

export const updateMotionControllerFactory = (): UpdateMotionController => {
  const gateway = new UpdateMotionGateway()
  const usecase = new UpdateMotionUseCase(gateway)
  return new UpdateMotionController(usecase)
}
