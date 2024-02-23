import { IRatingGameDTO } from '../DTOs/game/rating-game-schema'
import { IRate } from '../entities/IRating'
import { IRating } from '../entities/IGame'

export interface IRatingRepository {
  rateGame(rate: IRatingGameDTO): Promise<IRate>
  getRatedGames(userID: string, page: number): Promise<IRating[]>
  getRatedGameByUserIDAndGameID(
    userID: string,
    gameID: number,
  ): Promise<IRating | null>
  updateRating(id: string, stars: number): Promise<void>
}

export const ISRatingRepository = Symbol('IRatingRepository')
