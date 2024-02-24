import { Module } from '@nestjs/common'
import { UsersModule } from './infra/controllers/users'
import { GamesModule } from './infra/controllers/games/index.module'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GamesModule,
  ],
})
export class AppModule {}
