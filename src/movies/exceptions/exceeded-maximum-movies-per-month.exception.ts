import { HttpException } from '@nestjs/common'

export class ExceededMaximumMoviesPerMonthException extends HttpException {
  public constructor() {
    super('You cannot create more movies this month!', 400)
  }
}
