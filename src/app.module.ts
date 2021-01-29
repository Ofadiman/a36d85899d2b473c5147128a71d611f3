import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'

@Module({
  controllers: [AppController],
  imports: [ConfigModule, DatabaseModule]
})
export class AppModule {}
