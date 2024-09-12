import { ListMotionsController } from '@/adapters/controllers/motion/list/list-motions.controller'
import { MotionGateway } from '@/adapters/gateways/motion.gateway'
import { ListMotionsUseCase } from '@/application/usecases/motion/list/list-motions.usecase'

export const listMotionsControllerFactory = (): ListMotionsController => {
  const gateway = new MotionGateway()
  const usecase = new ListMotionsUseCase(gateway)
  return new ListMotionsController(usecase)
}
