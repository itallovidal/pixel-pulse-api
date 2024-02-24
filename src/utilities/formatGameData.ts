import { IGame } from '../domain/entities/IGame'
import { format, fromUnixTime } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IGameCard } from '../domain/entities/IGameCard'

export function formatGameData(game: IGame | IGameCard) {
  console.log(game)
  game.cover.url = game.cover.url.replace('t_thumb', 't_720p')

  if ('first_release_date' in game && game.first_release_date) {
    // formatting date for front-end/mobile
    const date = fromUnixTime(game.first_release_date)
    // replacing info
    game.releaseDate = format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    })
  }

  return game
}
