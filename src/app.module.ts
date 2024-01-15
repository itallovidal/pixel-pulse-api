import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersController } from './controllers/users.controller'
import { GameController } from './controllers/game.controller'

@Module({
  controllers: [UsersController, GameController],
  providers: [AppService],
})
export class AppModule {}
