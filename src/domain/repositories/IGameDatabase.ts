import { IGame } from '../entities/IGame'

export interface IGameDatabase {
  getRandomGame(): Promise<IGame>
}

export const IGameDatabase = Symbol('IGameDatabase')
