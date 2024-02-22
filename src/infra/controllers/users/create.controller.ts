import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import {
  createUserDTO,
  ICreateUserDTO,
} from '../../../domain/DTOs/create-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateUserUseCase } from '../../../app/useCases/users/createUserUseCase'
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library'

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('signup')
  async handle(
    @Body(new ZodValidationPipe(createUserDTO)) payload: ICreateUserDTO,
  ) {
    try {
      await this.createUserUseCase.execute(payload)
      return {
        status: 201,
        message: 'Usuário criado com sucesso!',
      }
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(e.message)
      }

      if (e instanceof PrismaClientInitializationError) {
        console.log('Erro na inicialização do docker!')
        throw new InternalServerErrorException(
          'Erro interno. Docker não foi inicializado.',
        )
      }

      throw new InternalServerErrorException('Erro interno de servidor.')
    }
  }
}
