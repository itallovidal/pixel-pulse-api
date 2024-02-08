import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ILoginUserDTO } from '../../../domain/DTOs/login-user-schema'
import {
  IUserRepository,
  IUsersRepository,
} from '../../../domain/repositories/IUsersRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import * as process from 'process'

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(IUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: ILoginUserDTO) {
    const user = await this.usersRepository.getUserByEmail(email)
    if (!user) {
      throw new NotFoundException({
        message: 'Email não encontrado no banco de dados.',
        field: 'email',
        status: 404,
        error: 'Not Found',
      })
    }

    const result = await compare(password, user.password)

    if (!result) {
      throw new ForbiddenException({
        message: 'Senha incorreta, tente novamente.',
        field: 'password',
        status: 403,
        error: 'forbidden',
      })
    }

    // TODO: corrigir essa merda aqui que tá ruim
    if (process.env.ACCESS_TOKEN_SECRET) {
      return sign(user, process.env.ACCESS_TOKEN_SECRET)
    }

    throw new InternalServerErrorException()
  }
}
