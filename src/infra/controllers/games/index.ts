import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { RandomController } from './random.controller'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { IGDBRepository } from '../../../app/repositories/igdbRepository'
import { RandomGameUseCase } from '../../../app/useCases/games/randomGameUseCase'
import { AuthUser } from '../../middlewares/auth.middleware'
import { RateGameController } from './rateGame.controller'
import { RateGameUseCase } from '../../../app/useCases/games/rateGameUseCase'
import { ISRatingRepository } from '../../../domain/repositories/IRatingRepository'
import { PrismaRatingRepository } from '../../../app/repositories/prismaRatingRepository'
import { RatedGamesUseCase } from '../../../app/useCases/games/ratedGamesUseCase'
import { RatedGamesController } from './ratedGames.controller'
import { CreateCommentController } from './createComment.controller'
import { CreateCommentUseCase } from '../../../app/useCases/games/createCommentUseCase'
import { ISCommentRepository } from '../../../domain/repositories/ICommentRepository'
import { PrismaCommentRepository } from '../../../app/repositories/prismaCommentRepository'
import { GetCommentsByGameController } from './getCommentsByGame.controller'
import { GetCommentsByGameUseCase } from '../../../app/useCases/games/getCommentsByGameUseCase'

@Module({
  controllers: [
    RandomController,
    CreateCommentController,
    RateGameController,
    RatedGamesController,
    GetCommentsByGameController,
  ],
  providers: [
    {
      provide: IGameDatabase,
      useClass: IGDBRepository,
    },
    {
      provide: ISCommentRepository,
      useClass: PrismaCommentRepository,
    },
    {
      provide: ISRatingRepository,
      useClass: PrismaRatingRepository,
    },
    RandomGameUseCase,
    RateGameUseCase,
    RatedGamesUseCase,
    CreateCommentUseCase,
    GetCommentsByGameUseCase,
  ],
})
export class GamesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthUser).forRoutes(
      {
        path: 'games/rate',
        method: RequestMethod.POST,
      },
      {
        path: 'games/rated',
        method: RequestMethod.GET,
      },
      {
        path: 'games/random/:filter',
        method: RequestMethod.GET,
      },
      {
        path: 'games/comment',
        method: RequestMethod.POST,
      },
    )
  }
}
