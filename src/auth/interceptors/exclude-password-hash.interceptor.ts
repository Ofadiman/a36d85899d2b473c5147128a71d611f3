import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { unset } from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { LoginResponseDto } from '../dto/login-response.dto'

@Injectable()
export class ExcludePasswordHashInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((value: LoginResponseDto) => {
        unset(value, 'user.passwordHash')

        return value
      })
    )
  }
}
