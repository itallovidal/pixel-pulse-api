import axios, { AxiosInstance } from 'axios'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IGameDatabase } from '../../domain/repositories/IGameDatabase'
import { IGame, IRatedGame } from '../../domain/entities/IGame'
import { getRandomInt } from '../../utilities/getRandomInt'
import { isEmptyObject } from '../../utilities/isEmptyObject'

@Injectable()
export class IGDBRepository implements IGameDatabase {
  private IGDB!: AxiosInstance

  constructor() {
    this.auth()
      .then((axios) => {
        this.IGDB = axios
      })
      .catch((e) => {
        throw e
      })
  }

  private async auth() {
    const response = await fetch(
      'https://id.twitch.tv/oauth2/token?client_id=2ty2mja5wgqlcu4uqzvcfrci2r6izl&client_secret=7ckqi2eeezh4cjahqfz90p9x707vbd&grant_type=client_credentials',
      {
        method: 'POST',
      },
    )

    if (response.status !== 200) {
      throw new InternalServerErrorException(
        'Erro ao inicializar a autenticação do IGDB.',
      )
    }

    const authObject: { access_token: string } = await response.json()

    return axios.create({
      baseURL: `https://api.IGDB.com/v4`,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${authObject.access_token}`,
        'Client-ID': `2ty2mja5wgqlcu4uqzvcfrci2r6izl`,
      },
    })
  }

  private async getCount() {
    const response = await this.IGDB.post('/games/count', 'where rating > 80;')
    if (response.status !== 200) {
      throw new Error('Erro ao pegar o count no IGDB.')
    }

    const { count } = response.data

    return count
  }

  private async getIGDBGame(query: string) {
    const response = await this.IGDB.post('games', query)

    if (response.status !== 200) {
      throw new Error('Erro na query do jogo aleatório.')
    }

    return response.data[0]
  }

  async getRandomGame(favoritesGenres: number[]): Promise<IGame> {
    const count = await this.getCount()
    console.log(count)
    let offset = getRandomInt(1, count)

    const genresFilter =
      favoritesGenres.length === 0
        ? ''
        : `& genres = (${favoritesGenres[0]}) | genres = (${favoritesGenres[1]}) `

    const platformFilter = `platforms = (8,130,11,41,9,48,167,169,12)`
    const requiredFields = `genres.name != null & first_release_date != null & cover != null & summary != null & rating >= 70`
    const fields = `fields name, first_release_date, cover.url, genres.name, summary, id, platforms.name`

    const query = `where ${requiredFields} & ${platformFilter} ${genresFilter} ; ${fields} ; limit 1; offset ${offset};`

    let game = await this.getIGDBGame(query)
    while (isEmptyObject(game)) {
      offset = getRandomInt(1, count)
      game = await this.getIGDBGame(query)
    }

    return game as IGame
  }

  async getMultipleGamesById(ids: number[]): Promise<IRatedGame[]> {
    const fields = `fields name, cover.url, genres.name, id`
    const query = `where id = (${ids.join()}) ; ${fields} ;`

    const response = await this.IGDB.post('games', query)

    if (response.status !== 200) {
      throw new Error('Erro ao pegar os jogos avaliados pelo usuário no IGDB.')
    }

    return response.data as IRatedGame[]
  }

  async getGameByID(gameID: number) {
    const fields = `fields name, first_release_date, cover.url, genres.name, summary, id, platforms.name`
    const query = `where id = (${gameID}) ; ${fields} ; limit 1;`
    const response = await this.IGDB.post('games', query)

    if (response.status !== 200) {
      throw new Error('Erro ao pegar o jogo pelo ID no IGDB.')
    }

    return response.data[0] as IGame
  }
}
