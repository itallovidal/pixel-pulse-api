import { ICommentRepository } from '../../domain/repositories/ICommentRepository'
import { PrismaClient } from '@prisma/client'
import { InternalServerErrorException } from '@nestjs/common'
import { ICreateCommentDTO } from '../../domain/DTOs/game/createCommentDTO'

export class PrismaCommentRepository
  extends PrismaClient
  implements ICommentRepository
{
  private readonly prisma: PrismaClient

  constructor() {
    super({
      log: ['error', 'warn'],
    })

    this.prisma = new PrismaClient()
  }

  async getCommentsByGameID(gameID: number) {
    const comments = await this.prisma.commentaries.findMany({
      where: {
        gameID,
      },
      include: {
        user: {
          select: {
            name: true,
            favGenre1: true,
            favGenre2: true,
          },
        },
      },
    })

    console.log(comments)

    return comments
  }

  async createComment(comment: ICreateCommentDTO): Promise<void> {
    try {
      await this.prisma.commentaries.create({
        data: comment,
      })
    } catch (e) {
      throw new InternalServerErrorException('Erro interno.')
    }
  }
}
