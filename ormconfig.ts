import { ConfigService } from './src/config/config.service'
import { NodeEnv } from './src/config/enums/node-env.enum'

const configService = new ConfigService()
const databaseConfig = configService.getDatabaseConfig(NodeEnv.Development)

module.exports = databaseConfig
