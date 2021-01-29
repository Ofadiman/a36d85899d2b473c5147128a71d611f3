import { HttpException } from '@nestjs/common'

export class UserNotFoundException extends HttpException {
  public constructor() {
    super('User not found!', 404)
  }
}
