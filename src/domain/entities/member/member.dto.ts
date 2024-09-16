export type MemberInputDTO = {
  name: string
  document: string
}

export type UpdateMemberInputDTO = {
  id: string
  name?: string
  document?: string
}
