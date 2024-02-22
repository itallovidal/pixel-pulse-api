import { Inject, Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'

import { IUser } from '../../../domain/entities/IUser'

import { BuildGameDataUseCase } from '../buildGameDataUseCase'

@Injectable()
export class RandomGameUseCase {
  constructor(
    @Inject(IGameDatabase) private gamesDB: IGameDatabase,
    @Inject(BuildGameDataUseCase)
    private buildGameDataUseCase: BuildGameDataUseCase,
  ) {}

  async execute(user: IUser, filter: 'discover' | 'forme') {
    // checking the filter to fetch
    const favoriteGenres =
      filter === `forme` ? [user.favGenre1, user.favGenre2] : []

    // getting the game and replacing the cover for better image quality
    const unformattedGame = await this.gamesDB.getRandomGame(favoriteGenres)

    return await this.buildGameDataUseCase.execute(unformattedGame, user.id)
  }
}
