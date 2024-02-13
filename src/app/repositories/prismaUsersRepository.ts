import { IUsersRepository } from '../../domain/repositories/IUsersRepository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ICreateUserDTO } from '../../domain/DTOs/create-user-schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { IUser } from '../../domain/entities/IUser'

@Injectable()
export class PrismaUsersRepository
  extends PrismaClient
  implements IUsersRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })

    this.prisma = new PrismaClient()
  }

  async createUser(user: ICreateUserDTO) {
    console.log('prismaRepository')

    try {
      await this.prisma.user.create({ data: user })
    } catch (e) {
      console.log(e instanceof PrismaClientKnownRequestError)

      if (e instanceof PrismaClientKnownRequestError) {
        console.log(e)
        throw new InternalServerErrorException(e.message)
      }

      throw new InternalServerErrorException(
        'Erro interno de servidor. Usuário não criado.',
      )
    }
  }

  async checkIfEmailExists(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    return !!user
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  // getUserByID(id: string): Promise<IUser> {
  //   return Promise.resolve(undefined)
  // }

  // loginUser(email: string, password: string): Promise<IUser> {
  //   return Promise.resolve(undefined)
  // }
}
