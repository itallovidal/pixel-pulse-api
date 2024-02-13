import { IGame, IRatedGame } from '../entities/IGame'

export interface IGameDatabase {
  getRandomGame(favoritesGenres: number[]): Promise<IGame>
  getRatedGames(ids: number[]): Promise<IRatedGame[]>
}

export const IGameDatabase = Symbol('IGameDatabase')
