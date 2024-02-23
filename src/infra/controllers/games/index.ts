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
import { GetGameByIDController } from './getGameByID.controller'
import { GetGameByIDUseCase } from '../../../app/useCases/games/getGameByIDUseCase'
import { UpdateRatingController } from './updateRating.controller'
import { UpdateRatingUseCase } from '../../../app/useCases/games/updateRatingUseCase'
import { AddToWishPlayController } from './addToWishPlay.controller'
import { GetWishedGamesController } from './getWishedGames.controller'
import { WishedGamesUseCase } from '../../../app/useCases/games/wishedGamesUseCase'
import { AddToWishPlayUseCase } from '../../../app/useCases/games/addToWishPlayUseCase'
import { ISWishPlayRepository } from '../../../domain/repositories/IWishPlay'
import { PrismaWishPlayRepository } from '../../../app/repositories/prismaWishPlayRepository'
import { BuildGameDataUseCase } from '../../../app/useCases/buildGameDataUseCase'
import { DeleteWishPlayController } from './deleteWishPlay.controller'
import { DeleteWishPlayUseCase } from '../../../app/useCases/games/deleteWishPlayUseCase'

@Module({
  controllers: [
    RandomController,
    CreateCommentController,
    RateGameController,
    RatedGamesController,
    GetCommentsByGameController,
    GetGameByIDController,
    UpdateRatingController,
    AddToWishPlayController,
    GetWishedGamesController,
    DeleteWishPlayController,
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
    {
      provide: ISWishPlayRepository,
      useClass: PrismaWishPlayRepository,
    },
    RandomGameUseCase,
    RateGameUseCase,
    RatedGamesUseCase,
    CreateCommentUseCase,
    GetCommentsByGameUseCase,
    GetGameByIDUseCase,
    UpdateRatingUseCase,
    WishedGamesUseCase,
    AddToWishPlayUseCase,
    BuildGameDataUseCase,
    DeleteWishPlayUseCase,
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
        path: 'games/rated/:page',
        method: RequestMethod.GET,
      },
      {
        path: 'games/get/:id',
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
      {
        path: 'games/wishPlay/:gameID',
        method: RequestMethod.POST,
      },
      {
        path: 'games/wishPlay',
        method: RequestMethod.GET,
      },
    )
  }
}
