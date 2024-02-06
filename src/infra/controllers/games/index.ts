import { Module } from '@nestjs/common'

import { GameController } from './game.controller'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { IGDBRepository } from '../../../app/repositories/igdbRepository'
import { RandomGameUseCase } from '../../../app/useCases/games/randomGameUseCase'

@Module({
  controllers: [GameController],
  providers: [
    {
      provide: IGameDatabase,
      useClass: IGDBRepository,
    },
    RandomGameUseCase,
  ],
})
export class GamesModule {}
