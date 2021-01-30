import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { ConfigService } from '../config/config.service'
import { UsersService } from '../users/users.service'
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
        },
        {
          provide: ConfigService,
          useValue: {}
        },
        {
          provide: UsersService,
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
