import {
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Response,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

import { IUser } from '../../../domain/entities/IUser'
import { gameIDDTO, IGameIDDTO } from '../../../domain/DTOs/gameIDDTO'
import { AddToWishPlayUseCase } from '../../../app/useCases/games/addToWishPlayUseCase'

@Controller('games')
export class AddToWishPlayController {
  constructor(private addToWishPlayUseCase: AddToWishPlayUseCase) {}

  @Post('wishPlay/:gameID')
  async handle(
    @Param(`gameID`, new ZodValidationPipe(gameIDDTO))
    gameID: IGameIDDTO,
    @Response({ passthrough: true }) res: Response,
  ) {
    try {
      const user = res['locals'].user as IUser
      const registry = await this.addToWishPlayUseCase.execute(gameID, user.id)

      return {
        status: 201,
        message: 'Jogo adicionado na wishlish com sucesso!',
        registry,
      }
    } catch (e) {
      console.log(e)
    }
  }
}
