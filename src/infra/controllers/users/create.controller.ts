import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import {
  createUserSchema,
  IcreateUserSchema,
} from '../../../domain/DTOs/create-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

@Controller('users')
export class UsersController {
  @Post('create')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() body: IcreateUserSchema) {
    console.log(body)
    return body
  }
}
