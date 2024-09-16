import { UpdateMemberInputDTO } from '@/domain/entities/member/member.dto'

export interface UpdateMemberUseCaseInterface {
  execute: (input: UpdateMemberInputDTO) => Promise<void>
}
