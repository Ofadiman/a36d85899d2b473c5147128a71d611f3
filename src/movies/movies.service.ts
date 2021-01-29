import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Movie } from './movie.entity'

@Injectable()
export class MoviesService {
  public constructor(@InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>) {}
}
