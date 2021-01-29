import { HttpException } from '@nestjs/common'

export class UserAlreadyExistsException extends HttpException {
  public constructor() {
    super('User already exists!', 400)
  }
}
