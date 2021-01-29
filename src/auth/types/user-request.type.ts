import { Request } from 'express'

import { User } from '../../users/user.entity'

export type UserRequest = Request & {
  user: User
}
