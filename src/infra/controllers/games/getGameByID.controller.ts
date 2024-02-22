import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Response,
} from '@nestjs/common'
import { GetGameByIDUseCase } from '../../../app/useCases/games/getGameByIDUseCase'
import { IUser } from '../../../domain/entities/IUser'

@Controller('games')
export class GetGameByIDController {
  constructor(private getGameByIDUseCase: GetGameByIDUseCase) {}

  @Get('/get/:id')
  async handle(
    @Param('id') gameID: number,
    @Response({ passthrough: true }) res: Response,
  ) {

    try {
      if (!gameID) {
        throw new BadRequestException(
          'ID do jogo precisa ser fornecido corretamente.',
        )
      }

      const user = res['locals'].user as IUser
      return await this.getGameByIDUseCase.execute(Number(gameID), user)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('Erro ao pegar o jogo pelo id.')
    }
  }
}
