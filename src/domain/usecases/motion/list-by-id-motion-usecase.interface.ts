export type ListMotionOutputDTO = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface ListMotionByIdUseCaseInterface {
  execute: (id: string) => Promise<ListMotionOutputDTO | null>
}
