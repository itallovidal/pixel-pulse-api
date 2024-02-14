import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetCommentsByGameUseCase } from '../../../app/useCases/games/getCommentsByGameUseCase'
import { GetGameByIDUseCase } from '../../../app/useCases/games/getGameByIDUseCase'

@Controller('games')
export class GetGameByIDController {
  constructor(private getGameByIDUseCase: GetGameByIDUseCase) {}

  @Get(':id')
  async handle(@Param('id') gameID: number) {
    try {
      if (!gameID) {
        throw new BadRequestException(
          'ID do jogo precisa ser fornecido corretamente.',
        )
      }

      const game = await this.getGameByIDUseCase.execute(Number(gameID))

      console.log(game)

      return game
    } catch (e) {
      console.log(e)
    }
  }
}
