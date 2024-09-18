export type VoteCountInputDTO = {
  motion: {
    name: string
    description: string
  }
  session: {
    start: string
    end: string
  }
  values: {
    value: string
    total: number
    percent: number
  }[]
}

export interface VoteCountUseCaseInterface {
  execute: (votingSessionId: string) => Promise<VoteCountInputDTO | null>
}
