import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Response,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateCommentUseCase } from '../../../app/useCases/games/createCommentUseCase'
import {
  commentFromUserDTO,
  ICommentFromUserDTO,
} from '../../../domain/DTOs/game/createCommentDTO'
import { IUser } from '../../../domain/entities/IUser'

@Controller('games')
export class CreateCommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  @Post('comment')
  async handle(
    @Body(new ZodValidationPipe(commentFromUserDTO))
    payload: ICommentFromUserDTO,
    @Response({ passthrough: true }) res: Response,
  ) {
    if (!res['locals']) {
      throw new InternalServerErrorException(
        'Erro interno de servidor. Middleware. ',
      )
    }
    try {
      const user = res['locals'].user as IUser
      await this.createCommentUseCase.execute(payload, user.id)

      return {
        status: 201,
        message: 'Comentário criado com sucesso!',
      }
    } catch (e) {
      console.log(e)
    }
  }
}
