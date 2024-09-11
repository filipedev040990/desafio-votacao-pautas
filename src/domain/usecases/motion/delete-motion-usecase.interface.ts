export interface DeleteMotionUseCaseInterface {
  execute: (id: string) => Promise<void>
}
