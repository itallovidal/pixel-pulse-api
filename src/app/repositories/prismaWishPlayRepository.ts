import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IWishPlayRepository } from '../../domain/repositories/IWishPlay'
import { IAddToWishPlayDTO } from '../../domain/DTOs/game/addToWishPlayDTO'
import { IWishPlay } from '../../domain/entities/IWishPlay'

@Injectable()
export class PrismaWishPlayRepository
  extends PrismaClient
  implements IWishPlayRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })

    this.prisma = new PrismaClient()
  }

  async addToWishPlay(wish: IAddToWishPlayDTO): Promise<void> {
    await this.prisma.wishPlay.create({
      data: wish,
    })
  }

  async getAllWishes(userID: string) {
    return this.prisma.wishPlay.findMany({
      where: {
        userID,
      },
    })
  }

  async deleteWishByID(id: string) {
    await this.prisma.wishPlay.delete({
      where: {
        id,
      },
    })
  }

  async getWishByUserIDAndGameID(
    userID: string,
    gameID: number,
  ): Promise<IWishPlay | null> {
    return this.prisma.wishPlay.findFirst({
      where: {
        userID,
        gameID,
      },
    })
  }

  async getWishByID(id: string): Promise<IWishPlay | null> {
    return this.prisma.wishPlay.findUnique({
      where: {
        id,
      },
    })
  }
}
