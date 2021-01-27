import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const commonDatabaseConfig = {
  autoLoadEntities: true,
  cli: {
    migrationsDir: 'src/database/migrations'
  },
  entities: [`dist/**/*.entity.js`],
  migrations: [`dist/database/migrations/*.js`],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [`dist/**/*.subscribers.js`],
  synchronize: false,
  type: 'postgres'
}
