import { Test, TestingModule } from '@nestjs/testing'

import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

describe('MoviesController', () => {
  let moviesController: MoviesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: {} }]
    }).compile()

    moviesController = module.get<MoviesController>(MoviesController)
  })

  it('should be defined', () => {
    expect(moviesController).toBeDefined()
  })
})
