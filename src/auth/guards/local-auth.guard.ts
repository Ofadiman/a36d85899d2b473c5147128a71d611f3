import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { PassportStrategies } from '../enums/passport-strategies.enum'

@Injectable()
export class LocalAuthGuard extends AuthGuard(PassportStrategies.Local) {}
