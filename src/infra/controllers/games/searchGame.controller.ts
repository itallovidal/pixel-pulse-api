import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ISearchDTO, searchDTO } from '../../../domain/DTOs/game/searchDTO'
import { SearchGameUseCase } from '../../../app/useCases/games/searchGameUseCase'

@Controller('games')
export class SearchGameController {
  constructor(private searchGameUseCase: SearchGameUseCase) {}

  @Get('search')
  async handle(@Query('q', new ZodValidationPipe(searchDTO)) q: ISearchDTO) {
    if (!q) {
      throw new BadRequestException(
        'A rota precisa de um parâmetro de pesquisa.',
      )
    }

    try {
      const gameToSearch = q.replaceAll('_', ' ')
      return await this.searchGameUseCase.execute(gameToSearch)
    } catch (e) {
      console.log(e)
    }
  }
}
