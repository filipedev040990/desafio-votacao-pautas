export type VotingUseCaseInputDTO = {
  memberId: string
  votingSessionId: string
  votingValue: string
}

export interface VotingUseCaseInterface {
  execute: (input: VotingUseCaseInputDTO) => Promise<void>
}
