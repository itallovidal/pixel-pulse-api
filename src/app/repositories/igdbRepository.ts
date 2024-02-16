import axios, { AxiosInstance } from 'axios'
import { Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../domain/repositories/IGameDatabase'
import { IGame, IRatedGame } from '../../domain/entities/IGame'

import * as console from 'console'

@Injectable()
export class IGDBRepository implements IGameDatabase {
  private igdb: AxiosInstance | undefined

  constructor() {
    this.auth()
  }

  private async auth() {
    const response = await fetch(
      'https://id.twitch.tv/oauth2/token?client_id=2ty2mja5wgqlcu4uqzvcfrci2r6izl&client_secret=7ckqi2eeezh4cjahqfz90p9x707vbd&grant_type=client_credentials',
      {
        method: 'POST',
      },
    )
    const authObject: { access_token: string } = await response.json()

    this.igdb = axios.create({
      baseURL: `https://api.igdb.com/v4`,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${authObject.access_token}`,
        'Client-ID': `2ty2mja5wgqlcu4uqzvcfrci2r6izl`,
      },
    })
  }

  // pega um número aleatório
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // verifica se o objeto é vazio
  private isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  private async getCount(api: AxiosInstance) {
    try {
      const response = await api.post('/games/count', 'where rating > 80;')

      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  private async getIGDBGame(
    offset: number,
    api: AxiosInstance,
    favoritesGenres: number[],
  ) {
    try {
      console.log(favoritesGenres)

      const genresFilter =
        favoritesGenres.length === 0
          ? ''
          : `& genres = (${favoritesGenres[0]}) | genres = (${favoritesGenres[1]}) `
      const platformFilter = `platforms = (8,130,11,41,9,48,167,169,12)`
      const requiredFields = `genres.name != null & first_release_date != null & cover != null & summary != null & rating >= 70`
      const fields = `fields name, first_release_date, cover.url, genres.name, summary, id, platforms.name`

      // 104561
      // console.log(offset)

      const query = `where ${requiredFields} & ${platformFilter} ${genresFilter} ; ${fields} ; limit 1; offset ${offset};`
      const game = await api.post('games', query)

      // if (game.data[0].summary && game.data[0].cover) {
      //   return game.data[0]
      // }

      return game.data[0]
    } catch (err) {
      console.error(err)
    }
  }

  async getRandomGame(favoritesGenres: number[]): Promise<IGame> {
    try {
      if (this.igdb === undefined) {
        throw new Error('Erro na hora de inicializar o igdb')
      }

      const { count } = await this.getCount(this.igdb)

      let offset = this.getRandomInt(1, count)
      let game = await this.getIGDBGame(offset, this.igdb, favoritesGenres)
      while (this.isEmptyObject(game)) {
        offset = this.getRandomInt(1, count)
        game = await this.getIGDBGame(offset, this.igdb, favoritesGenres)
      }

      return game as IGame
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getRatedGames(ids: number[]): Promise<IRatedGame[]> {
    try {
      if (this.igdb === undefined) {
        throw new Error('Erro na hora de inicializar o igdb')
      }

      const fields = `fields name, cover.url, genres.name, id`

      const query = `where id = (${ids.join()}) ; ${fields} ;`
      const { data } = await this.igdb.post('games', query)
      return data as IRatedGame[]
    } catch (err) {
      console.error(err)
      throw new Error('Erro interno')
    }
  }

  async getGameByID(gameID: number) {
    if (!this.igdb) {
      throw new Error('a')
    }

    const fields = `fields name, first_release_date, cover.url, genres.name, summary, id, platforms.name`
    const query = `where id = (${gameID}) ; ${fields} ; limit 1;`
    const game = await this.igdb.post('games', query)

    return game.data[0] as IGame
  }
}
