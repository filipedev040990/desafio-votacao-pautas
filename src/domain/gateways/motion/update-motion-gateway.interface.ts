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

export interface UpdateMotionGatewayInterface {
  update: (input: UpdateMotionGatewayInputDTO) => Promise<void>
  getById: (id: string) => Promise<MotionGatewayOutputDTO | null>
  getMotionVotingById: (id: string) => Promise<MotionVotingOutoutDTO | null>
}
