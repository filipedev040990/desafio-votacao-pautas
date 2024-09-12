import { ListMotionOutputDTO } from '../usecases/motion/list-by-id-motion-usecase.interface'

export type CreateMotionGatewayInputDTO = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type UpdateMotionGatewayInputDTO = {
  id: string
  name?: string
  description?: string
  updatedAt: Date
}

export type MotionGatewayOutputDTO = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type MotionVotingOutoutDTO = {
  id: string
  motionId: string
  startVoting: Date
  endVoting: Date
  createdAt: Date
  updatedAt: Date
}

export interface MotionGatewayInterface {
  save: (input: CreateMotionGatewayInputDTO) => Promise<void>
  update: (input: UpdateMotionGatewayInputDTO) => Promise<void>
  getById: (id: string) => Promise<MotionGatewayOutputDTO | null>
  getMotionVotingById: (id: string) => Promise<MotionVotingOutoutDTO | null>
  delete: (id: string, updatedAt: Date) => Promise<void>
}
