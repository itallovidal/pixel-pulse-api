import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Response,
  UnauthorizedException,
} from '@nestjs/common'
import { RateGameUseCase } from '../../../../app/useCases/games/rating/rateGameUseCase'
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe'
import {
  IRatingGameDTO,
  ratingGameDTO,
} from '../../../../domain/DTOs/game/rating-game-schema'
import { IUser } from '../../../../domain/entities/IUser'

@Controller('games')
export class RateGameController {
  constructor(private rateGameUseCase: RateGameUseCase) {}

  @Post('rate')
  async handle(
    @Body(new ZodValidationPipe(ratingGameDTO)) payload: IRatingGameDTO,
    @Response({ passthrough: true }) res: Response,
  ) {
    if (!res['locals']) {
      throw new InternalServerErrorException(
        'Erro interno de servidor. Middleware. ',
      )
    }

    try {
      const user = res['locals'].user as IUser

      console.log(user)

      const record = await this.rateGameUseCase.execute({
        ...payload,
        userID: user.id,
      })

      console.log(record)

      return {
        status: 201,
        message: 'Avaliação registrada com sucesso!',
        created: record,
      }
    } catch (e) {
      console.log(e)

      throw new InternalServerErrorException(
        'Erro interno, tente novamente mais tarde.',
      )
    }
  }
}
