export type Vote = {
  votingValue: string
  VotingSession: {
    Motion: {
      name: string
      description: string
    }
    startVoting: Date
    endVoting: Date
  }
}

export type VoteResult = {
  Sim: {
    total: number
    percent: number
  }
  Não: {
    total: number
    percent: number
  }
}

export type VoteCountOutputDTO = {
  motion: {
    name: string
    description: string
  }
  session: {
    start: Date
    end: Date
  }
  values: VoteResult
  total: number
}

export interface VoteCountUseCaseInterface {
  execute: (votingSessionId: string) => Promise<VoteCountOutputDTO | null>
}
