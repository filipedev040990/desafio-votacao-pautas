import { ListMotionByIdController } from '@/adapters/controllers/motion/list-by-id/list-by-id-motion.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { ListMotionByIdUseCase } from '@/application/usecases/motion/list-by-id/list-by-id-motion.usecase'

export const listMotionByIdControllerFactory = (): ListMotionByIdController => {
  const gateway = new MotionGateway()
  const usecase = new ListMotionByIdUseCase(gateway)
  return new ListMotionByIdController(usecase)
}
