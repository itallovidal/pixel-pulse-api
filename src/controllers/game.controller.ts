import { Controller, Get } from '@nestjs/common'
import { igdbAPI } from '../axios/axios-config'

@Controller(`game`)
export class GameController {
  @Get()
  async getGame() {
    try {
      const games = await igdbAPI.post(
        `/games`,
        'fields name, category, cover, first_release_date, genres, platforms;',
      )

      return games.data
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  }
}
