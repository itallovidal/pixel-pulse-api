import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersController } from './controllers/users.controller'

@Module({
  controllers: [UsersController],
  providers: [AppService],
})
export class AppModule {}
