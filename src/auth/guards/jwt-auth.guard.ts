import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { AuthMetadata } from '../enums/auth-metadata.enum'
import { PassportStrategies } from '../enums/passport-strategies.enum'

@Injectable()
export class JwtAuthGuard extends AuthGuard(PassportStrategies.Jwt) {
  public constructor(private readonly reflector: Reflector) {
    super()
  }

  public canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(AuthMetadata.IsPublicRoute, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublicRoute) {
      return true
    }

    return super.canActivate(context)
  }
}
