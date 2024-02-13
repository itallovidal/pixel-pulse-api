import { Inject, Injectable } from '@nestjs/common'
import {
  IRatingRepository,
  ISRatingRepository,
} from '../../../domain/repositories/IRatingRepository'
import { IRatingGameDTO } from '../../../domain/DTOs/game/rating-game-schema'

@Injectable()
export class RateGameUseCase {
  constructor(
    @Inject(ISRatingRepository) private ratingRepository: IRatingRepository,
  ) {}

  async execute(rate: IRatingGameDTO & { userID: string }) {
    try {
      return await this.ratingRepository.rateGame(rate)
    } catch (e) {
      console.log(e)
    }
  }
}
