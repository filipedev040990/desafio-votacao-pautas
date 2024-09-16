import { UpdateMemberController } from '@/adapters/controllers/member/update/update-member.controller'
import { MemberGateway } from '@/adapters/gateways/member.gateway'
import { UpdateMemberUseCase } from '@/application/usecases/member/update/update-member.usecase'

export const updateMemberControllerFactory = (): UpdateMemberController => {
  const gateway = new MemberGateway()
  const usecase = new UpdateMemberUseCase(gateway)
  return new UpdateMemberController(usecase)
}
