import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { commonDatabaseConfig } from './const/common-database-config.const'
import { EnvironmentVariables } from './enums/environment-variables.enum'
import { NodeEnv } from './enums/node-env.enum'

@Injectable()
export class ConfigService extends NestConfigService {
  public get(variable: EnvironmentVariables): string {
    return super.get(variable) as string
  }

  public getDatabaseConfig(environment: NodeEnv): TypeOrmModuleOptions {
    switch (environment) {
      case NodeEnv.Development:
        return {
          ...commonDatabaseConfig,
          database: this.get(EnvironmentVariables.PostgresDevDatabase),
          host: this.get(EnvironmentVariables.PostgresDevHost),
          password: this.get(EnvironmentVariables.PostgresDevPassword),
          port: Number(this.get(EnvironmentVariables.PostgresDevPort)),
          username: this.get(EnvironmentVariables.PostgresDevUser)
        } as TypeOrmModuleOptions
      case NodeEnv.Test:
        return {
          ...commonDatabaseConfig,
          database: this.get(EnvironmentVariables.PostgresTestDatabase),
          host: this.get(EnvironmentVariables.PostgresTestHost),
          password: this.get(EnvironmentVariables.PostgresTestPassword),
          port: Number(this.get(EnvironmentVariables.PostgresTestPort)),
          username: this.get(EnvironmentVariables.PostgresTestUser)
        } as TypeOrmModuleOptions
    }
  }
}
