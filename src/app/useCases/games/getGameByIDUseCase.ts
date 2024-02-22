import { Inject, Injectable } from '@nestjs/common'
import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'
import { BuildGameDataUseCase } from '../buildGameDataUseCase'
import { IUser } from '../../../domain/entities/IUser'

@Injectable()
export class GetGameByIDUseCase {
  constructor(
    @Inject(IGameDatabase) private gamesDB: IGameDatabase,
    @Inject(BuildGameDataUseCase)
    private buildGameDataUseCase: BuildGameDataUseCase,
  ) {}

  async execute(gameID: number, user: IUser) {
    const unformattedGame = await this.gamesDB.getGameByID(gameID)
    return await this.buildGameDataUseCase.execute(unformattedGame, user.id)
  }
}
