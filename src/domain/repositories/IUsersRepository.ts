export interface IUsersRepository {
  createUser()
  getUserByID()
  loginUser()
}

export const IUserRepository = Symbol('IUsersRepository')
