export type CreateVotingSessionInputDTO = {
  motionId: string
  startVoting: Date
  endVoting?: Date
}

export type CreateVotingSessionOutputDTO = {
  id: string
  motionId: string
  startVoting: Date
  endVoting: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateVotingSessionUseCaseInterface {
  execute: (input: CreateVotingSessionInputDTO) => Promise<CreateVotingSessionOutputDTO>
}
