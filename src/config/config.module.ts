import { object, required } from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { ConfigService } from './config.service'
import { EnvironmentVariables } from './enums/environment-variables.enum'

@Module({
  exports: [ConfigService],
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: object({
        [EnvironmentVariables.JwtExpiresIn]: required(),
        [EnvironmentVariables.JwtIss]: required(),
        [EnvironmentVariables.JwtSecret]: required(),
        [EnvironmentVariables.OmdbApiKey]: required(),
        [EnvironmentVariables.PostgresDevDatabase]: required(),
        [EnvironmentVariables.PostgresDevHost]: required(),
        [EnvironmentVariables.PostgresDevPassword]: required(),
        [EnvironmentVariables.PostgresDevPort]: required(),
        [EnvironmentVariables.PostgresDevUser]: required(),
        [EnvironmentVariables.PostgresTestDatabase]: required(),
        [EnvironmentVariables.PostgresTestHost]: required(),
        [EnvironmentVariables.PostgresTestPassword]: required(),
        [EnvironmentVariables.PostgresTestPort]: required(),
        [EnvironmentVariables.PostgresTestUser]: required(),
        [EnvironmentVariables.ServerPort]: required()
      })
    })
  ],
  providers: [ConfigService]
})
export class ConfigModule {}
