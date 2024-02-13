import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  Response,
} from '@nestjs/common'
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
    if (!res['locals']) {
      throw new InternalServerErrorException(
        'Erro interno de servidor. Middleware. ',
      )
    }

    try {
      const user = res['locals'].user as IUser
      const favoriteGenres =
        filter === `forme` ? [user.favGenre1, user.favGenre2] : []
      return await this.randomGameUseCase.execute(favoriteGenres)
    } catch (e) {
      console.log(e)
    }
  }
}
