import { Inject, Injectable } from '@nestjs/common'

import { IGameDatabase } from '../../../domain/repositories/IGameDatabase'

@Injectable()
export class GetGameByIDUseCase {
  constructor(@Inject(IGameDatabase) private gamesDB: IGameDatabase) {}

  async execute(gameID: number) {
    return await this.gamesDB.getGameByID(gameID)
  }
}
