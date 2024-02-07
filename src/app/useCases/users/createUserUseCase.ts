import { Inject, Injectable } from '@nestjs/common'
import {
  IUserRepository,
  IUsersRepository,
} from '../../../domain/repositories/IUsersRepository'
import { ICreateUserDTO } from '../../../domain/DTOs/create-user-schema'
import { hash } from 'bcrypt'
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute(user: ICreateUserDTO) {
    console.log('useCase')
    const { password, ...data } = user

    const encryptedPassword = await hash(password, 5)
    const newUser = {
      ...data,
      password: encryptedPassword,
    }

    return this.usersRepository.createUser(newUser)
  }
}
