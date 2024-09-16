import { CreateMemberController } from '@/adapters/controllers/member/create/create-member.controller'
import { MemberGateway } from '@/adapters/gateways/member.gateway'
import { CreateMemberUseCase } from '@/application/usecases/member/create/create-member.usecase'

export const createMemberControllerFactory = (): CreateMemberController => {
  const gateway = new MemberGateway()
  const usecase = new CreateMemberUseCase(gateway)
  return new CreateMemberController(usecase)
}
