import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EnvironmentVariables } from '../../config/enums/environment-variables.enum'
import { User } from '../../users/user.entity'
import { AuthService } from '../auth.service'
import { PassportStrategies } from '../enums/passport-strategies.enum'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, PassportStrategies.Jwt) {
  public constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env[EnvironmentVariables.JwtSecret]
    })
  }

  public async validate(payload: { sub: number }): Promise<User> {
    return this.authService.getAuthenticatedUserById(payload.sub)
  }
}
