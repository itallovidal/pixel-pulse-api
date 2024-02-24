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
import { RateGameController } from './rating/rateGame.controller'
import { RateGameUseCase } from '../../../app/useCases/games/rating/rateGameUseCase'
import { ISRatingRepository } from '../../../domain/repositories/IRatingRepository'
import { PrismaRatingRepository } from '../../../app/repositories/prismaRatingRepository'
import { RatedGamesUseCase } from '../../../app/useCases/games/rating/ratedGamesUseCase'
import { RatedGamesController } from './rating/ratedGames.controller'
import { CreateCommentController } from './commentary/createComment.controller'
import { CreateCommentUseCase } from '../../../app/useCases/games/commentary/createCommentUseCase'
import { ISCommentRepository } from '../../../domain/repositories/ICommentRepository'
import { PrismaCommentRepository } from '../../../app/repositories/prismaCommentRepository'
import { GetCommentsByGameController } from './commentary/getCommentsByGame.controller'
import { GetCommentsByGameUseCase } from '../../../app/useCases/games/commentary/getCommentsByGameUseCase'
import { GetGameByIDController } from './getGameByID.controller'
import { GetGameByIDUseCase } from '../../../app/useCases/games/getGameByIDUseCase'
import { UpdateRatingController } from './rating/updateRating.controller'
import { UpdateRatingUseCase } from '../../../app/useCases/games/rating/updateRatingUseCase'
import { AddToWishPlayController } from './wish/addToWishPlay.controller'
import { GetWishedGamesController } from './wish/getWishedGames.controller'
import { WishedGamesUseCase } from '../../../app/useCases/games/wish/wishedGamesUseCase'
import { AddToWishPlayUseCase } from '../../../app/useCases/games/wish/addToWishPlayUseCase'
import { ISWishPlayRepository } from '../../../domain/repositories/IWishPlay'
import { PrismaWishPlayRepository } from '../../../app/repositories/prismaWishPlayRepository'
import { BuildGameDataUseCase } from '../../../app/useCases/buildGameDataUseCase'
import { DeleteWishPlayController } from './wish/deleteWishPlay.controller'
import { DeleteWishPlayUseCase } from '../../../app/useCases/games/wish/deleteWishPlayUseCase'
import { SearchGameController } from './searchGame.controller'
import { SearchGameUseCase } from '../../../app/useCases/games/searchGameUseCase'

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
    SearchGameController,
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
    SearchGameUseCase,
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
        path: 'games/wishPlay/:page',
        method: RequestMethod.GET,
      },
    )
  }
}
