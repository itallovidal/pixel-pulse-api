import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  createUserSchema,
  IcreateUserSchema,
} from '../pipes/schemas/create-user-schema'
import {
  ILoginUserSchema,
  LoginUserSchema,
} from '../pipes/schemas/login-user-schema'

@Controller('users')
export class UsersController {
  @Post('create')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() body: IcreateUserSchema) {
    console.log(body)
    return body
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  login(@Body() body: ILoginUserSchema) {
    console.log(body)
    return body
  }
}
