import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import {
  ILoginUserSchema,
  LoginUserSchema,
} from '../../../domain/DTOs/login-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

@Controller('users')
export class LoginController {
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  login(@Body() body: ILoginUserSchema) {
    console.log(body)
    return body
  }
}
