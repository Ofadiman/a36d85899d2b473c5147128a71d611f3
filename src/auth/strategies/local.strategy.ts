import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { User } from '../../users/user.entity'
import { AuthService } from '../auth.service'
import { PassportStrategies } from '../enums/passport-strategies.enum'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, PassportStrategies.Local) {
  public constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.getAuthenticatedUserByEmail(email, password)
  }
}
