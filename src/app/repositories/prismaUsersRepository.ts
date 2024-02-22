import { IUsersRepository } from '../../domain/repositories/IUsersRepository'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ICreateUserDTO } from '../../domain/DTOs/create-user-schema'
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
    await this.prisma.user.create({ data: user })
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
