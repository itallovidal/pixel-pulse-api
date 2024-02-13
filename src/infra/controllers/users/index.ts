import { Module } from '@nestjs/common'
import { CreateUserController } from './create.controller'
import { LoginUserController } from './login.controller'
import { CreateUserUseCase } from '../../../app/useCases/users/createUserUseCase'
import { PrismaUsersRepository } from '../../../app/repositories/prismaUsersRepository'
import { ISUserRepository } from '../../../domain/repositories/IUsersRepository'
import { LoginUserUseCase } from '../../../app/useCases/users/loginUserUseCase'

@Module({
  controllers: [CreateUserController, LoginUserController],
  providers: [
    {
      provide: ISUserRepository,
      useClass: PrismaUsersRepository,
    },
    CreateUserUseCase,
    LoginUserUseCase,
  ],
})
export class UsersModule {}
