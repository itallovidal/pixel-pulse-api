import { IUser } from '../domain/entities/IUser'
import { Response } from '@nestjs/common'

declare module 'Response' {
  interface Response {
    locals: {
      token: IUser
    }
  }
}
