import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../../users/user.entity'

type UserKeys = keyof User

export const GetUser = createParamDecorator<UserKeys>((data: UserKeys | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: User }>()

  return data === undefined ? request.user : request.user[data]
})
