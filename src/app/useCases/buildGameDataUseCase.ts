import { Inject, Injectable } from '@nestjs/common'
import {
  ISWishPlayRepository,
  IWishPlayRepository,
} from '../../domain/repositories/IWishPlay'
import {
  IRatingRepository,
  ISRatingRepository,
} from '../../domain/repositories/IRatingRepository'
import { IGame } from '../../domain/entities/IGame'
import { format, fromUnixTime } from 'date-fns'
import { ptBR } from 'date-fns/locale'

@Injectable()
export class BuildGameDataUseCase {
  constructor(
    @Inject(ISWishPlayRepository)
    private wishPlayRepository: IWishPlayRepository,
    @Inject(ISRatingRepository) private ratingRepository: IRatingRepository,
  ) {}

  async execute(game: IGame, userID: string) {
    game.cover.url = game.cover.url.replace('t_thumb', 't_720p')

    // formatting date for front-end/mobile
    const date = fromUnixTime(game.first_release_date)
    // replacing info
    game.releaseDate = format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    })

    // checking if the game is in the wish list
    const wishListInfo = await this.wishPlayRepository.getWishByUserIDAndGameID(
      userID,
      game.id,
    )

    // checking if the game already has rated
    const rateInfo = await this.ratingRepository.getRatedGameByUserIDAndGameID(
      userID,
      game.id,
    )

    return {
      info: {
        ...game,
      },
      wishList: {
        isListed: !!wishListInfo,
        id: wishListInfo?.id,
      },
      rating: {
        isRated: !!rateInfo,
        stars: rateInfo?.stars,
        id: rateInfo?.id,
      },
    }
  }
}
