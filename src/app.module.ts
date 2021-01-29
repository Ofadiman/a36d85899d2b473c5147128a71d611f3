import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [AppController],
  imports: [RolesModule, UsersModule, ConfigModule, DatabaseModule]
})
export class AppModule {}
