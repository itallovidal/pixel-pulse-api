import { Injectable } from '@nestjs/common'

import { PrismaClient } from '@prisma/client'
import { IRatingGameDTO } from '../../domain/DTOs/game/rating-game-schema'
import { IRatingRepository } from '../../domain/repositories/IRatingRepository'
import { IRate } from '../../domain/entities/IRating'

@Injectable()
export class PrismaRatingRepository
  extends PrismaClient
  implements IRatingRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })

    this.prisma = new PrismaClient()
  }

  async getRatedGames(userID: string) {
    return this.prisma.rating.findMany({
      where: {
        userID,
      },
      orderBy: {
        stars: 'desc',
      },
    })
  }

  async updateRating(id: string, stars: number) {
    await this.prisma.rating.update({
      where: {
        id,
      },
      data: {
        stars,
      },
    })
  }

  async rateGame({
    gameID,
    userID,
    stars,
  }: IRatingGameDTO & { userID: string }): Promise<IRate> {
    return this.prisma.rating.create({
      data: {
        gameID,
        userID,
        stars,
      },
    })
  }

  async getRatedGameByUserIDAndGameID(userID: string, gameID: number) {
    return this.prisma.rating.findFirst({
      where: {
        gameID,
        userID,
      },
    })
  }
}
