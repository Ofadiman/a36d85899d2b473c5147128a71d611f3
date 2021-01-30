import { Body, Controller, Get, Post } from '@nestjs/common'

import { GetUser } from '../auth/decorators/get-user.decorator'
import { User } from '../users/user.entity'
import { CreateOneMovieDto } from './dto/create-one-movie.dto'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Movie } from './movie.entity'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  public constructor(private readonly moviesService: MoviesService) {}

  @Post()
  public async createOne(@GetUser() user: User, @Body() createOneMovieDto: CreateOneMovieDto): Promise<Movie> {
    return this.moviesService.createOne(user, createOneMovieDto)
  }

  @Get()
  public async getAll(@GetUser() user: User): Promise<Movie[]> {
    return this.moviesService.getAll(user)
  }
}
