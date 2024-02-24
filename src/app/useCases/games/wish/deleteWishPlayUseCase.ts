import { Inject, Injectable } from '@nestjs/common'
import {
  ISWishPlayRepository,
  IWishPlayRepository,
} from '../../../../domain/repositories/IWishPlay'

@Injectable()
export class DeleteWishPlayUseCase {
  constructor(
    @Inject(ISWishPlayRepository)
    private wishPlayRepository: IWishPlayRepository,
  ) {}

  async execute(id: string) {
    await this.wishPlayRepository.deleteWishByID(id)
  }
}
