import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { AuthMetadata } from '../enums/auth-metadata.enum'

export const PublicRoute = (): CustomDecorator => SetMetadata(AuthMetadata.IsPublicRoute, true)
