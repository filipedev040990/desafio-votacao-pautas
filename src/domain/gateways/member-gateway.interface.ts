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

export type UpdateMemberGatewayInputDTO = {
  id: string
  name?: string
  document?: string
  updatedAt: Date
}
export interface MemberGatewayInterface {
  save: (input: CreateMemberGatewayInputDTO) => Promise<void>
  update: (input: UpdateMemberGatewayInputDTO) => Promise<void>
  getByDocument: (document: string) => Promise<MemberOutputDTO | null>
  getById: (id: string) => Promise<MemberOutputDTO | null>
}
