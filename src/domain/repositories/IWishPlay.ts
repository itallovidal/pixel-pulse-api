import { IAddToWishPlayDTO } from '../DTOs/game/addToWishPlayDTO'
import { IWishPlay } from '../entities/IWishPlay'

export interface IWishPlayRepository {
  addToWishPlay: (data: IAddToWishPlayDTO) => Promise<void>
  getAllWishes: (userID: string) => Promise<IWishPlay[]>
  getWishByID: (id: string) => Promise<IWishPlay | null>
  getWishByUserIDAndGameID: (
    userID: string,
    gameID: number,
  ) => Promise<IWishPlay | null>
  deleteWishByID: (id: string) => Promise<void>
}

export const ISWishPlayRepository = Symbol('IWishPlayRepository')
