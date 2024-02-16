import { Body, Controller, Param, Patch } from '@nestjs/common'
import { UpdateRatingUseCase } from '../../../app/useCases/games/updateRatingUseCase'

@Controller('games')
export class UpdateRatingController {
  constructor(private updateRatingUseCase: UpdateRatingUseCase) {}
  @Patch('rate/:id')
  async handle(@Param('id') id: string, @Body('stars') stars: number) {
    await this.updateRatingUseCase.execute(id, stars)
  }
}
