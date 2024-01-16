import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersController } from './controllers/users.controller'
import { GameController } from './controllers/game.controller'
import { IGDBService } from './services/igdb.service'

@Module({
  controllers: [UsersController, GameController],
  providers: [AppService, IGDBService],
})
export class AppModule {}
