import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { MoviesModule } from './movies/movies.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [AppController],
  imports: [MoviesModule, AuthModule, RolesModule, UsersModule, ConfigModule, DatabaseModule]
})
export class AppModule {}
