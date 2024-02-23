import { IGame } from '../domain/entities/IGame'
import { format, fromUnixTime } from 'date-fns/index'
import { ptBR } from 'date-fns/locale'

export function formatGameData(game: IGame) {
  game.cover.url = game.cover.url.replace('t_thumb', 't_720p')

  // formatting date for front-end/mobile
  const date = fromUnixTime(game.first_release_date)
  // replacing info
  game.releaseDate = format(date, 'dd/MM/yyyy', {
    locale: ptBR,
  })

  return game
}
