import { IGameDatabase } from '../../../../domain/repositories/IGameDatabase'
import { Inject, Injectable } from '@nestjs/common'
import {
  ISWishPlayRepository,
  IWishPlayRepository,
} from '../../../../domain/repositories/IWishPlay'

@Injectable()
export class WishedGamesUseCase {
  constructor(
    @Inject(ISWishPlayRepository)
    private wishPlayRepository: IWishPlayRepository,
    @Inject(IGameDatabase) private gamesDB: IGameDatabase,
  ) {}

  async execute(userID: string, page: number) {
    const wishedRegistry = await this.wishPlayRepository.getAllWishes(
      userID,
      page,
    )

    if (wishedRegistry.length === 0) {
      return []
    }

    const ids = wishedRegistry.map((rate) => {
      return rate.gameID
    })

    const games = await this.gamesDB.getMultipleGamesById(ids)

    games.forEach((game) => {
      game.cover.url = game.cover.url.replace('t_thumb', 't_cover_big')
    })

    return wishedRegistry.map((registry) => {
      const found = games.find((game) => game.id === registry.gameID)
      if (found) {
        return {
          ...found,
          ...registry,
        }
      }

      return {
        cover: {
          id: 'erro',
          url: 'erro',
        },
        name: 'erro',
        ...registry,
      }
    })
  }
}
