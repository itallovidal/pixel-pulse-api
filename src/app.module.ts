import { Module } from '@nestjs/common'
import { UsersModule } from './infra/controllers/users'
import { GamesModule } from './infra/controllers/games'

@Module({
  imports: [UsersModule, GamesModule],
})
export class AppModule {}
