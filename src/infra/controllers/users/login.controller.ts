import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import {
  ILoginUserDTO,
  loginUserDTO,
} from '../../../domain/DTOs/login-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

@Controller('users')
export class LoginUserController {
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginUserDTO))
  login(@Body() body: ILoginUserDTO) {
    console.log(body)
    return body
  }
}
