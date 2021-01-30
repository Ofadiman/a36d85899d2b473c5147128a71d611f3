import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { EnvironmentVariables } from '../config/enums/environment-variables.enum'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get(EnvironmentVariables.JwtSecret),
          signOptions: {
            expiresIn: configService.get(EnvironmentVariables.JwtExpiresIn),
            issuer: configService.get(EnvironmentVariables.JwtIss)
          }
        }
      }
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
