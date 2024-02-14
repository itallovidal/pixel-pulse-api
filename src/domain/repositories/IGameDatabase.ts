import { IGame, IRatedGame } from '../entities/IGame'

export interface IGameDatabase {
  getRandomGame(favoritesGenres: number[]): Promise<IGame>
  getRatedGames(ids: number[]): Promise<IRatedGame[]>
  getGameByID(gameID: number): Promise<IGame>
}

export const IGameDatabase = Symbol('IGameDatabase')
