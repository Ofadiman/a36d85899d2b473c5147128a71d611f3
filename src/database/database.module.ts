import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { NodeEnv } from '../config/enums/node-env.enum'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.getDatabaseConfig(NodeEnv.Development)
      }
    })
  ]
})
export class DatabaseModule {}
