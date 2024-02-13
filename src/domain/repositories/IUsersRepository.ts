import { ICreateUserDTO } from '../DTOs/create-user-schema'
import { IUser } from '../entities/IUser'

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): void
  // getUserByID(id: string): Promise<IUser>
  getUserByEmail(email: string): Promise<IUser | null>
}

export const ISUserRepository = Symbol('IUsersRepository')
