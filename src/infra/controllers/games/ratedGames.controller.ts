import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Response,
} from '@nestjs/common'
import { IUser } from '../../../domain/entities/IUser'
import { RatedGamesUseCase } from '../../../app/useCases/games/ratedGamesUseCase'

@Controller('games')
export class RatedGamesController {
  constructor(private ratedGamesUseCase: RatedGamesUseCase) {}

  @Get('rated')
  async handle(@Response({ passthrough: true }) res: Response) {
    if (!res['locals']) {
      throw new InternalServerErrorException(
        'Erro interno de servidor. Middleware. ',
      )
    }

    try {
      const user = res['locals'].user as IUser

      return await this.ratedGamesUseCase.execute(user.id)
    } catch (e) {
      console.log(e)

      throw new InternalServerErrorException(
        'Erro interno, tente novamente mais tarde.',
      )
    }
  }
}
