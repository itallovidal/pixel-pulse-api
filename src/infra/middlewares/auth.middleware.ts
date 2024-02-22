import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { verify, decode } from 'jsonwebtoken'
import * as process from 'process'

@Injectable()
export class AuthUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization

    if (!auth) {
      throw new UnauthorizedException('Token necessário.')
    }

    // TODO: FAZER VALIDACAO DO ZOD
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new InternalServerErrorException(
        'Erro interno de servidor, tente novamente mais tarde.',
      )
    }

    const token = auth.split('Bearer ')[1]
    console.log('Token Extraído.')

    try {
      verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log('Token válido.')

      const user = decode(token)
      res.locals.user = user
      console.log('Usuário fornecido.')
      next()
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException('Token inválido.')
    }
  }
}
