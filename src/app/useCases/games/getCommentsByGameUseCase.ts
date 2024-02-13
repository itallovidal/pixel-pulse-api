import { Inject, Injectable } from '@nestjs/common'
import {
  ICommentRepository,
  ISCommentRepository,
} from '../../../domain/repositories/ICommentRepository'

@Injectable()
export class GetCommentsByGameUseCase {
  constructor(
    @Inject(ISCommentRepository) private commentRepository: ICommentRepository,
  ) {}

  async execute(gameID: number) {
    return await this.commentRepository.getCommentsByGameID(gameID)
  }
}
