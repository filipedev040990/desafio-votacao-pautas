export type CreateMemberGatewayInputDTO = {
  id: string
  name: string
  document: string
  createdAt: Date
  updatedAt: Date
}

export interface MemberGatewayInterface {
  save: (input: CreateMemberGatewayInputDTO) => Promise<void>
}
