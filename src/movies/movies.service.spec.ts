import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Movie } from './movie.entity'
import { MoviesService } from './movies.service'

describe('MoviesService', () => {
  let moviesService: MoviesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {}
        }
      ]
    }).compile()

    moviesService = module.get<MoviesService>(MoviesService)
  })

  it('should be defined', () => {
    expect(moviesService).toBeDefined()
  })
})
