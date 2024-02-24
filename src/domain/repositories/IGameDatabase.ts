import { IGame, IRatedGame } from '../entities/IGame'
import { IGameCard } from '../entities/IGameCard'

export interface IGameDatabase {
  getRandomGame(favoritesGenres: number[]): Promise<IGame>
  getMultipleGamesById(ids: number[]): Promise<IRatedGame[]>
  getGameByID(gameID: number): Promise<IGame>
  searchGame(gameToSearch: string): Promise<IGameCard[]>
}

export const IGameDatabase = Symbol('IGameDatabase')
