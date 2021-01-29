import { OmitType } from '@nestjs/swagger'

import { User } from '../../users/user.entity'

class UserWithoutPasswordHash extends OmitType(User, ['passwordHash']) {}

export class LoginResponseDto {
  public accessToken: string
  public user: UserWithoutPasswordHash
}
