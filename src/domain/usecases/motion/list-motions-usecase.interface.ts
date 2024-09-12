import { ListMotionOutputDTO } from './list-by-id-motion-usecase.interface'

export interface ListMotionsUseCaseInterface {
  execute: () => Promise<ListMotionOutputDTO[] | null>
}
