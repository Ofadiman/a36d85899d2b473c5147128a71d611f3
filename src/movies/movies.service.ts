import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import fetch from 'node-fetch'
import { Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { EnvironmentVariables } from '../config/enums/environment-variables.enum'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { CreateOneMovieDto } from './dto/create-one-movie.dto'
import { ExceededMaximumMoviesPerMonthException } from './exceptions/exceeded-maximum-movies-per-month.exception'
import { OmdbMovieException } from './exceptions/omdb-movie.exception'
import { Movie } from './movie.entity'
import { OmdbResponse } from './types/omdb-response.type'

@Injectable()
export class MoviesService {
  public constructor(
    @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  public async createOne(user: User, createOneMovieDto: CreateOneMovieDto): Promise<Movie> {
    const omdbData = await this.fetchOmdbMovieData(createOneMovieDto.title)
    const totalUserMoviesThisMonth = await this.getTotalUserMoviesThisMonth(user.id)
    const hasPremium = this.usersService.hasPremium(user)
    const canCreateMovie = totalUserMoviesThisMonth < 5 || hasPremium

    if (canCreateMovie) {
      return this.moviesRepository.save({
        directory: omdbData.Director,
        genre: omdbData.Genre,
        released: omdbData.Released,
        title: omdbData.Title,
        user
      })
    }
    throw new ExceededMaximumMoviesPerMonthException()
  }

  public async getAll(user: User): Promise<Movie[]> {
    return this.moviesRepository.createQueryBuilder('movies').where('movies.user_id = :id', { id: user.id }).getMany()
  }

  private async fetchOmdbMovieData(title: string): Promise<OmdbResponse> {
    const apiKey = this.configService.get(EnvironmentVariables.OmdbApiKey)

    try {
      const omdbResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)

      return (await omdbResponse.json()) as OmdbResponse
    } catch {
      throw new OmdbMovieException()
    }
  }

  private async getTotalUserMoviesThisMonth(userId: number): Promise<number> {
    return this.moviesRepository
      .createQueryBuilder('movies')
      .where('movies.user_id = :id AND extract (month FROM movies.created_at) = extract (month FROM CURRENT_DATE)', {
        id: userId
      })
      .getCount()
  }
}
