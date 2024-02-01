import { Module } from '@nestjs/common'
import { UsersModule } from './infra/controllers/users'

@Module({
  imports: [UsersModule],
})
export class AppModule {}
