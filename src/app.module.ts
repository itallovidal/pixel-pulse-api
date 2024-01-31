import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersController } from './infra/controllers/users/users.controller'
import { GameController } from './infra/controllers/games/game.controller'
import { IGDBService } from './app/services/igdb.service'

@Module({
  controllers: [UsersController, GameController],
  providers: [AppService, IGDBService],
})
export class AppModule {}
