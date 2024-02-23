import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Response,
} from '@nestjs/common'
import { IUser } from '../../../domain/entities/IUser'
import { RatedGamesUseCase } from '../../../app/useCases/games/ratedGamesUseCase'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import {
  IPageValidationDTO,
  pageValidationDTO,
} from '../../../domain/DTOs/pageValidationDTO'

@Controller('games')
export class RatedGamesController {
  constructor(private ratedGamesUseCase: RatedGamesUseCase) {}

  @Get('rated/:page')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Param('page', new ZodValidationPipe(pageValidationDTO))
    page: IPageValidationDTO,
  ) {
    try {
      const user = res['locals'].user as IUser

      console.log(user)
      return await this.ratedGamesUseCase.execute(user.id, page)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(
        'Erro interno, tente novamente mais tarde.',
      )
    }
  }
}
