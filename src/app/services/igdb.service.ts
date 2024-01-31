import axios, { AxiosInstance } from 'axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IGDBService {
  private igdb

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

  private async getIGDBGame(offset, api: AxiosInstance) {
    try {
      const query = `fields *; limit 1; offset ${offset};`
      const response = await api.post('games', query)
      return response.data[0]
    } catch (err) {
      console.error(err)
    }
  }

  async getRandomGame() {
    try {
      const { count } = await this.getCount(this.igdb)

      let offset = this.getRandomInt(1, count)
      let game = await this.getIGDBGame(offset, this.igdb)

      while (this.isEmptyObject(game)) {
        offset = this.getRandomInt(1, count)
        game = await this.getIGDBGame(offset, this.igdb)
      }

      return game
    } catch (err) {
      console.error(err)
    }
  }
}
