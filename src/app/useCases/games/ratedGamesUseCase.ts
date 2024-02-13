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

  async execute(userID: string) {
    try {
      const ratedRegistry = await this.ratingRepository.getRatedGames(userID)
      const ids = ratedRegistry.map((rate) => {
        return rate.gameID
      })

      const games = await this.gamesDB.getRatedGames(ids)

      games.forEach((game) => {
        game.cover.url = game.cover.url.replace('t_thumb', 't_cover_big')
      })

      // Criar um objeto de mapeamento para os IDs
      const gameMap = {}

      // Preencher o mapeamento com os objetos do primeiro vetor
      games.forEach((game) => {
        gameMap[game.id] = { ...game }
      })

      console.log(gameMap)

      // Atualizar o mapeamento com as propriedades do segundo vetor
      ratedRegistry.forEach((registry) => {
        if (gameMap[registry.gameID]) {
          gameMap[registry.gameID].stars = registry.stars
        }
      })

      // Converter o objeto de mapeamento de volta para um array
      const ratedGames = Object.values(gameMap)

      return ratedGames
    } catch (e) {
      console.log(e)
    }
  }
}
