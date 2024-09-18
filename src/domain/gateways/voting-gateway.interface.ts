export type CreateVotingGatewayInputDTO = {
  id: string
  memberId: string
  votingSessionId: string
  votingValue: string
  createdAt: Date
  updatedAt: Date
}

export interface VotingGatewayInterface {
  save: (input: CreateVotingGatewayInputDTO) => Promise<void>
  getByMemberAndVotingSession: (memberId: string, votingSessionId: string) => Promise<CreateVotingGatewayInputDTO | null>
  getBySessionId: (sessionId: string) => Promise<any | null>
}
