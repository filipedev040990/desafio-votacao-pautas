import { MotionGatewayInterface } from '@/domain/gateways/motion-gateway.interface'
import { ListMotionOutputDTO } from '@/domain/usecases/motion/list-by-id-motion-usecase.interface'
import { ListMotionsUseCaseInterface } from '@/domain/usecases/motion/list-motions-usecase.interface'

export class ListMotionsUseCase implements ListMotionsUseCaseInterface {
  constructor(private readonly gateway: MotionGatewayInterface) {}
  async execute(): Promise<ListMotionOutputDTO[] | null> {
    return await this.gateway.list()
  }
}
