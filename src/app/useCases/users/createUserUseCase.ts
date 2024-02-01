import { Inject, Injectable } from '@nestjs/common'
import {
  IUserRepository,
  IUsersRepository,
} from '../../../domain/repositories/IUsersRepository'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute() {
    return this.usersRepository.createUser()
  }
}
