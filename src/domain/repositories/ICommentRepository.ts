import { IComment } from '../entities/IComment'
import { ICreateCommentDTO } from '../DTOs/game/createCommentDTO'

export interface ICommentRepository {
  createComment: (comment: ICreateCommentDTO) => Promise<void>
  getCommentsByGameID: (gameID: number) => Promise<IComment[]>
}

export const ISCommentRepository = Symbol('ICommentRepository')
