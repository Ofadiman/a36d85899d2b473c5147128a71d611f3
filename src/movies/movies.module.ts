import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Movie } from './movie.entity'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
  controllers: [MoviesController],
  exports: [MoviesService],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService]
})
export class MoviesModule {}
