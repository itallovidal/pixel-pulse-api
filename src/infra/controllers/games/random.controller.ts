import { Controller, Get, Param, Response } from '@nestjs/common'
import { RandomGameUseCase } from '../../../app/useCases/games/randomGameUseCase'
import { IUser } from '../../../domain/entities/IUser'

@Controller(`games`)
export class RandomController {
  constructor(private randomGameUseCase: RandomGameUseCase) {}

  @Get('random/:filter')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Param(`filter`) filter: `discover` | `forme`,
  ) {
    try {
      const user = res['locals'].user as IUser

      return await this.randomGameUseCase.execute(user, filter)
    } catch (e) {
      throw e
    }
  }
}
