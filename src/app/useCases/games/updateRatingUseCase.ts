import { Inject, Injectable } from '@nestjs/common'
import {
  IRatingRepository,
  ISRatingRepository,
} from '../../../domain/repositories/IRatingRepository'

@Injectable()
export class UpdateRatingUseCase {
  constructor(
    @Inject(ISRatingRepository) private ratingRepository: IRatingRepository,
  ) {}

  async execute(id: string, rate: number) {
    return await this.ratingRepository.updateRating(id, rate)
  }
}
