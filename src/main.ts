import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { EnvironmentVariables } from './config/enums/environment-variables.enum'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService>(ConfigService)

  const serverPort = configService.get(EnvironmentVariables.ServerPort)

  await app.listen(serverPort)
}

void bootstrap()
