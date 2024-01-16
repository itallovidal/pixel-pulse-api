import axios, { AxiosInstance } from 'axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IGDBService {
  async auth() {
    const response = await fetch(
      'https://id.twitch.tv/oauth2/token?client_id=2ty2mja5wgqlcu4uqzvcfrci2r6izl&client_secret=7ckqi2eeezh4cjahqfz90p9x707vbd&grant_type=client_credentials',
      {
        method: 'POST',
      },
    )
    const authObject: { access_token: string } = await response.json()
    return authObject.access_token
  }

  // pega um número aleatório
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // verifica se o objeto é vazio
  isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  async getCount(api: AxiosInstance) {
    try {
      const response = await api.post('/games/count', 'where rating > 80;')

      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  async getIGDBGame(offset, api: AxiosInstance) {
    try {
      console.log(offset)
      const query = `fields *; limit 1; offset ${offset};`
      const response = await api.post('games', query)
      return response.data[0]
    } catch (err) {
      console.error(err)
    }
  }

  async getRandomGame() {
    try {
      const token = await this.auth()
      const IGBBApi = axios.create({
        baseURL: `https://api.igdb.com/v4`,
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${token}`,
          'Client-ID': `2ty2mja5wgqlcu4uqzvcfrci2r6izl`,
        },
      })

      const { count } = await this.getCount(IGBBApi)
      let offset = this.getRandomInt(1, count)
      let game = await this.getIGDBGame(offset, IGBBApi)
      console.log(game)
      while (this.isEmptyObject(game)) {
        offset = this.getRandomInt(1, count)
        game = await this.getIGDBGame(offset, IGBBApi)
      }

      return game
    } catch (err) {
      console.error(err)
    }
  }
}
