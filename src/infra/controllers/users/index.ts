import { Module } from '@nestjs/common'
import { CreateUserController } from './create.controller'
import { LoginUserController } from './login.controller'
import { CreateUserUseCase } from '../../../app/useCases/users/createUserUseCase'
import { PrismaUsersRepository } from '../../../app/repositories/prismaUsersRepository'
import { IUserRepository } from '../../../domain/repositories/IUsersRepository'

@Module({
  controllers: [CreateUserController, LoginUserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUsersRepository,
    },
    CreateUserUseCase,
  ],
})
export class UsersModule {}
