import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetCommentsByGameUseCase } from '../../../app/useCases/games/getCommentsByGameUseCase'

@Controller('games')
export class GetCommentsByGameController {
  constructor(private getCommentsByGameUseCase: GetCommentsByGameUseCase) {}

  @Get('comment/:id')
  async handle(@Param('id') gameID: number) {
    try {
      if (!gameID) {
        throw new BadRequestException(
          'ID do jogo precisa ser fornecido corretamente.',
        )
      }

      const comments = await this.getCommentsByGameUseCase.execute(gameID)

      return comments
    } catch (e) {
      console.log(e)
    }
  }
}
