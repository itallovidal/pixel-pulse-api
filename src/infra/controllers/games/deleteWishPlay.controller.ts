import { Controller, Delete, Param, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { DeleteWishPlayUseCase } from '../../../app/useCases/games/deleteWishPlayUseCase'
import { idDTO, IIdDTO } from '../../../domain/DTOs/idDTO'

@Controller('games')
export class DeleteWishPlayController {
  constructor(private deleteWishPlayUseCase: DeleteWishPlayUseCase) {}

  @Delete('wishPlay/:id')
  async handle(
    @Param(`id`, new ZodValidationPipe(idDTO))
    id: IIdDTO,
    @Response({ passthrough: true }) res: Response,
  ) {
    try {
      await this.deleteWishPlayUseCase.execute(id)
      return {
        status: 204,
        message: 'Jogo deletado da lista de desejos!',
      }
    } catch (e) {
      console.log(e)
    }
  }
}
