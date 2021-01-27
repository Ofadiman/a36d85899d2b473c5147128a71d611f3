import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'

@Module({
  controllers: [AppController],
  imports: [ConfigModule]
})
export class AppModule {}
