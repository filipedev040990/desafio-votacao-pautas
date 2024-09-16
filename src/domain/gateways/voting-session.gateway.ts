export type CreateVotingSessionInputDTO = {
  id: string
  motionId: string
  startVoting: Date
  endVoting: Date
  createdAt: Date
  updatedAt: Date
}

export interface VotingSessionGatewayInterface {
  save: (input: CreateVotingSessionInputDTO) => Promise<void>
}
