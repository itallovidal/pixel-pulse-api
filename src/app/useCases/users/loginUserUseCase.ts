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
    console.log(email)
    console.log(password)

    const user = await this.usersRepository.getUserByEmail(email)
    if (!user) {
      throw new NotFoundException('Email não encontrado no banco de dados.')
    }

    // const hashedPassword = await hash(password, 5)
    // const user = await this.usersRepository.getUserByEmail(
    //   email,
    //   hashedPassword,
    // )

    const result = await compare(password, user.password)

    if (!result) {
      throw new ForbiddenException('Senha incorreta, tente novamente.')
    }

    // TODO: corrigir essa merda aqui que tá ruim
    if (process.env.ACCESS_TOKEN_SECRET) {
      return sign(user, process.env.ACCESS_TOKEN_SECRET)
    }

    throw new InternalServerErrorException()
  }
}
