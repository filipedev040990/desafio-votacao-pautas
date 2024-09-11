import { DeleteMotionController } from '@/adapters/controllers/motion/delete/delete-motion.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { DeleteMotionUseCase } from '@/application/usecases/motion/delete/delete-motion.usecase'

export const deleteMotionControllerFactory = (): DeleteMotionController => {
  const gateway = new MotionGateway()
  const usecase = new DeleteMotionUseCase(gateway)
  return new DeleteMotionController(usecase)
}
