import { Inject, Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'

@Injectable()
export class RandomGameUseCase {
  constructor(@Inject(IGameDatabase) private gamesDB: IGameDatabase) {}

  async execute() {
    const game = await this.gamesDB.getRandomGame()
    return game
  }
}
