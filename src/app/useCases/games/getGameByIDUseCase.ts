import { Inject, Injectable } from '@nestjs/common'

import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { format, fromUnixTime } from 'date-fns'
import { ptBR } from 'date-fns/locale'

@Injectable()
export class GetGameByIDUseCase {
  constructor(@Inject(IGameDatabase) private gamesDB: IGameDatabase) {}

  async execute(gameID: number) {
    const game = await this.gamesDB.getGameByID(gameID)

    game.cover.url = game.cover.url.replace('t_thumb', 't_720p')

    const date = fromUnixTime(game.first_release_date)
    const formattedDate = format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    })

    game.releaseDate = formattedDate

    return game
  }
}
