export type CreateMemberGatewayInputDTO = {
  id: string
  name: string
  document: string
  createdAt: Date
  updatedAt: Date
}

export type MemberOutputDTO = {
  id: string
  name: string
  document: string
  createdAt: Date
  updatedAt: Date
}
export interface MemberGatewayInterface {
  save: (input: CreateMemberGatewayInputDTO) => Promise<void>
  getByDocument: (document: string) => Promise<MemberOutputDTO | null>
}
