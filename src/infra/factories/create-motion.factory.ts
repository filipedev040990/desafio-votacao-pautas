import { CreateMotionController } from '@/adapters/controllers/motion/create/create-motion.controller'
import { CreateMotionGateway } from '@/adapters/gateways/motion/create-motion.gateway'
import { CreateMotionUseCase } from '@/application/usecases/motion/create/create-motion.usecase'

export const createMotionControllerFactory = (): CreateMotionController => {
  const gateway = new CreateMotionGateway()
  const usecase = new CreateMotionUseCase(gateway)
  return new CreateMotionController(usecase)
}
