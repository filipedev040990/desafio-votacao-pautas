export type CreateMotionGatewayInputDTO = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateMotionGatewayInterface {
  save: (input: CreateMotionGatewayInputDTO) => Promise<void>
}
