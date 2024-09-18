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

// {
//   motion: {
//     name: '',
//     description: ''
//   },
//   session: {
//     start: '',
//     end: ''
//   },
//   values: [
//     {
//       value: 'Sim',
//       total: 70,
//       percent: 70
//     },
//     {
//       value: 'Não',
//       total: 30,
//       percent: 30
//     }
//   ],
//   totalVotes: 100
// }
