import { CreateMotionController } from '@/adapters/controllers/motion/create/create-motion.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { CreateMotionUseCase } from '@/application/usecases/motion/create/create-motion.usecase'

export const createMotionControllerFactory = (): CreateMotionController => {
  const gateway = new MotionGateway()
  const usecase = new CreateMotionUseCase(gateway)
  return new CreateMotionController(usecase)
}
