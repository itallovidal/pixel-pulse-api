import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Response,
} from '@nestjs/common'
import { IUser } from '../../../../domain/entities/IUser'
import { WishedGamesUseCase } from '../../../../app/useCases/games/wish/wishedGamesUseCase'
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe'
import {
  IPageValidationDTO,
  pageValidationDTO,
} from '../../../../domain/DTOs/pageValidationDTO'

@Controller('games')
export class GetWishedGamesController {
  constructor(private wishedGamesUseCase: WishedGamesUseCase) {}

  @Get('wishPlay/:page')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Param('page', new ZodValidationPipe(pageValidationDTO))
    page: IPageValidationDTO,
  ) {
    try {
      const user = res['locals'].user as IUser
      return await this.wishedGamesUseCase.execute(user.id, page)
    } catch (e) {
      throw new InternalServerErrorException(
        'Erro interno, tente novamente mais tarde.',
      )
    }
  }
}
