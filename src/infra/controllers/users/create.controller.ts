import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import {
  createUserDTO,
  ICreateUserDTO,
} from '../../../domain/DTOs/create-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateUserUseCase } from '../../../app/useCases/users/createUserUseCase'

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createUserDTO))
  async handle(@Body() body: ICreateUserDTO) {
    console.log(body)
    const resultado = await this.createUserUseCase.execute()
    return resultado
  }
}
