export type CreateVotingSessionInputDTO = {
  id: string
  motionId: string
  startVoting: Date
  endVoting: Date
  createdAt: Date
  updatedAt: Date
}

export type CreateVotingSessionOutputDTO = {
  id: string
  motionId: string
  startVoting: Date
  endVoting: Date
  createdAt: Date
  updatedAt: Date
}

export interface VotingSessionGatewayInterface {
  save: (input: CreateVotingSessionInputDTO) => Promise<void>
  getById: (id: string) => Promise<CreateVotingSessionOutputDTO | null>
}
