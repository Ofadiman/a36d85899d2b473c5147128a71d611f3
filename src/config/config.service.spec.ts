import { Test, TestingModule } from '@nestjs/testing'

import { ConfigService } from './config.service'
import { commonDatabaseConfig } from './const/common-database-config.const'
import { EnvironmentVariables } from './enums/environment-variables.enum'
import { testCases } from './test-utils/config.service.test.utils'
import objectContaining = jasmine.objectContaining

describe('ConfigService', () => {
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService]
    }).compile()

    configService = module.get<ConfigService>(ConfigService)
  })

  test('should return environment variable', () => {
    const port = configService.get(EnvironmentVariables.PostgresDevPort)

    expect(port).toEqual(expect.stringMatching('\\d+'))
  })

  testCases.forEach((nodeEnv) => {
    test(`should return database config for ${nodeEnv} environment`, () => {
      const databaseConfig = configService.getDatabaseConfig(nodeEnv)

      expect(databaseConfig).toEqual(
        objectContaining({
          ...commonDatabaseConfig,
          database: expect.any(String),
          host: expect.any(String),
          password: expect.any(String),
          port: expect.any(Number),
          username: expect.any(String)
        })
      )
    })
  })
})
