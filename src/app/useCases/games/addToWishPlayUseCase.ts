import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import {
  ISWishPlayRepository,
  IWishPlayRepository,
} from '../../../domain/repositories/IWishPlay'

@Injectable()
export class AddToWishPlayUseCase {
  constructor(
    @Inject(ISWishPlayRepository)
    private wishPlayRepository: IWishPlayRepository,
  ) {}

  async execute(gameID: number, userID: string) {
    const wishPlayGame = {
      id: randomUUID(),
      userID,
      gameID,
    }

    await this.wishPlayRepository.addToWishPlay(wishPlayGame)

    return wishPlayGame
  }
}
