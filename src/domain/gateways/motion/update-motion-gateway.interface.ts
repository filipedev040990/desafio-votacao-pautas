export type UpdateMotionGatewayInputDTO = {
  id: string
  name?: string
  description?: string
  updatedAt: Date
}

export interface UpdateMotionGatewayInterface {
  update: (input: UpdateMotionGatewayInputDTO) => Promise<void>
}
