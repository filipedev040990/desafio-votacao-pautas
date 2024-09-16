import { MemberInputDTO } from '@/domain/entities/member/member.dto'

export interface CreateMemberUseCaseInterface {
  execute: (input: MemberInputDTO) => Promise<{ id: string }>
}
