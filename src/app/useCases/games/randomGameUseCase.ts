import { Inject, Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { fromUnixTime, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

@Injectable()
export class RandomGameUseCase {
  constructor(@Inject(IGameDatabase) private gamesDB: IGameDatabase) {}

  async execute(favoritesGenres: number[]) {
    const game = await this.gamesDB.getRandomGame(favoritesGenres)
    game.cover.url = game.cover.url.replace('t_thumb', 't_720p')

    const date = fromUnixTime(game.first_release_date)
    const formattedDate = format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    })
    game.releaseDate = formattedDate
    return game
  }
}
