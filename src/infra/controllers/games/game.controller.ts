import { Controller, Get } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'

@Controller(`game`)
export class GameController {
  constructor(private gamesDB: IGameDatabase) {}

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
