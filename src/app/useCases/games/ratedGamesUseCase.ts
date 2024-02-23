import { Inject, Injectable } from '@nestjs/common'
import {
  IRatingRepository,
  ISRatingRepository,
} from '../../../domain/repositories/IRatingRepository'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'

@Injectable()
export class RatedGamesUseCase {
  constructor(
    @Inject(ISRatingRepository) private ratingRepository: IRatingRepository,
    @Inject(IGameDatabase) private gamesDB: IGameDatabase,
  ) {}

  async execute(userID: string, page: number) {
    const ratedRegistry = await this.ratingRepository.getRatedGames(
      userID,
      page,
    )

    if (ratedRegistry.length === 0) {
      return []
    }

    const ids = ratedRegistry.map((rate) => {
      return rate.gameID
    })

    const games = await this.gamesDB.getMultipleGamesById(ids)

    games.forEach((game) => {
      game.cover.url = game.cover.url.replace('t_thumb', 't_cover_big')
    })

    const ratedGames = ratedRegistry.map((registry) => {
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

    return ratedGames
  }
}
