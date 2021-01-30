import { HttpException } from '@nestjs/common'

export class OmdbMovieException extends HttpException {
  public constructor() {
    super('Could not fetch the movie details!', 400)
  }
}
