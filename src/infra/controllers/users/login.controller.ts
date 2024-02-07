import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  ILoginUserDTO,
  loginUserDTO,
} from '../../../domain/DTOs/login-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { LoginUserUseCase } from '../../../app/useCases/users/loginUserUseCase'

@Controller('users')
export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginUserDTO))
  async handle(@Body() body: ILoginUserDTO) {
    try {
      const accessToken = await this.loginUserUseCase.execute(body)
      return {
        accessToken,
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e
      }

      if (e instanceof ForbiddenException) {
        throw e
      }
      console.log(e)
      throw new InternalServerErrorException('Erro interno de servidor.')
    }
  }
}
