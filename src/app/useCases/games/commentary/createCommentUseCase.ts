import { Inject, Injectable } from '@nestjs/common'
import {
  ICommentRepository,
  ISCommentRepository,
} from '../../../../domain/repositories/ICommentRepository'
import { randomUUID } from 'crypto'
import { ICommentFromUserDTO } from '../../../../domain/DTOs/game/createCommentDTO'

@Injectable()
export class CreateCommentUseCase {
  constructor(
    @Inject(ISCommentRepository) private commentRepository: ICommentRepository,
  ) {}

  async execute(comment: ICommentFromUserDTO, userID: string) {
    const newComment = {
      ...comment,
      id: randomUUID(),
      likes: 0,
      dislikes: 0,
      userID,
    }

    await this.commentRepository.createComment(newComment)
  }
}
