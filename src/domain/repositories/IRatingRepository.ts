import { IRatingGameDTO } from '../DTOs/game/rating-game-schema'
import { IRate } from '../entities/IRating'
import { IRating } from '../entities/IGame'

export interface IRatingRepository {
  rateGame(rate: IRatingGameDTO): Promise<IRate>
  getRatedGames(userID: string): Promise<IRating[]>
}

export const ISRatingRepository = Symbol('IRatingRepository')
