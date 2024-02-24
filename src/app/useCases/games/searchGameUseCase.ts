import { Inject, Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { formatGameData } from '../../../utilities/formatGameData'

@Injectable()
export class SearchGameUseCase {
  constructor(@Inject(IGameDatabase) private gamesDB: IGameDatabase) {}

  async execute(gameToSearch: string) {
    const unformattedGamesFound = await this.gamesDB.searchGame(gameToSearch)
    return unformattedGamesFound.map((game) => formatGameData(game))
  }
}
