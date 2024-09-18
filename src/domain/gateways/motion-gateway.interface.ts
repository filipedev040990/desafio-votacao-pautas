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

export type MotionVotingOutputDTO = {
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
  getVotingSessionByMotionId: (id: string) => Promise<MotionVotingOutputDTO | null>
  delete: (id: string, updatedAt: Date) => Promise<void>
  list: () => Promise<MotionGatewayOutputDTO[] | null>
}
