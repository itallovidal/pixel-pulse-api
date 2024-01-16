import { Controller, Get } from '@nestjs/common'
import { IGDBService } from '../services/igdb.service'

@Controller(`game`)
export class GameController {
  constructor(private gamesDB: IGDBService) {}

  @Get('random')
  async getGame() {
    try {
      const game = await this.gamesDB.getRandomGame()

      return game
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  }
}
