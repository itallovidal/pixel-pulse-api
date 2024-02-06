import { Controller, Get } from '@nestjs/common'
import { RandomGameUseCase } from '../../../app/useCases/games/randomGameUseCase'

@Controller(`game`)
export class GameController {
  constructor(private randomGameUseCase: RandomGameUseCase) {}

  @Get('random')
  async handle() {
    const game = await this.randomGameUseCase.execute()

    return game
  }
}
