import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Response,
} from '@nestjs/common'
import { IUser } from '../../../domain/entities/IUser'
import { WishedGamesUseCase } from '../../../app/useCases/games/wishedGamesUseCase'
import {
  ISWishPlayRepository,
  IWishPlayRepository,
} from '../../../domain/repositories/IWishPlay'

@Controller('games')
export class GetWishedGamesController {
  constructor(private wishedGamesUseCase: WishedGamesUseCase) {}

  @Get('wishPlay')
  async handle(@Response({ passthrough: true }) res: Response) {
    try {
      const user = res['locals'].user as IUser
      return await this.wishedGamesUseCase.execute(user.id)
    } catch (e) {
      throw new InternalServerErrorException(
        'Erro interno, tente novamente mais tarde.',
      )
    }
  }
}
