import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import fetch from 'node-fetch'

import { ConfigService } from '../config/config.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { ExceededMaximumMoviesPerMonthException } from './exceptions/exceeded-maximum-movies-per-month.exception'
import { OmdbMovieException } from './exceptions/omdb-movie.exception'
import { Movie } from './movie.entity'
import { MoviesService } from './movies.service'
import { getCount, getMany, moviesRepository, save } from './test-utils/movies.service.spec.utils'
import { OmdbResponse } from './types/omdb-response.type'

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockName('fetch')
}))

const omdbMovieResponse: OmdbResponse = {
  Actors: 'Cynthia Loyst, Melissa Grelo, Lainey Lui, Traci Melchor',
  Awards: '2 nominations.',
  Country: 'Canada',
  Director: 'N/A',
  Genre: 'Talk-Show',
  Language: 'English',
  Metascore: 'N/A',
  Plot:
    'The Social is a daily talk show that features news, pop culture, and lifestyle topics. A socially interactive series, The Social incorporates viewer feedback and conversation through Twitter, Facebook, Instagram and more.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZjEyMTNlMzUtMTVjMS00ZGRlLTk1ZjYtMDY2MWIzYWY4OWMyXkEyXkFqcGdeQXVyNzA5MzMzNjk@._V1_SX300.jpg',
  Rated: 'N/A',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '3.0/10'
    }
  ],
  Released: '02 Sep 2013',
  Response: 'True',
  Runtime: '60 min',
  Title: 'The Social',
  Type: 'series',
  Writer: 'N/A',
  Year: '2013–',
  imdbID: 'tt3218622',
  imdbRating: '3.0',
  imdbVotes: '249',
  totalSeasons: '5'
}

const hasPremium = jest.fn().mockName('hasPremium')

describe('MoviesService', () => {
  const fetchMock = (fetch as unknown) as jest.Mock
  let moviesService: MoviesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: moviesRepository
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockName('get')
          }
        },
        {
          provide: UsersService,
          useValue: {
            hasPremium
          }
        }
      ]
    }).compile()

    moviesService = module.get<MoviesService>(MoviesService)
  })

  afterEach(() => {
    fetchMock.mockReset()
    getCount.mockReset()
    getMany.mockReset()
    save.mockReset()
    hasPremium.mockReset()
  })

  describe('getAll', () => {
    const user = new User()
    user.id = 1
    const movie = new Movie()
    test('should return all movies', async () => {
      getMany.mockReturnValueOnce([movie])
      const result = await moviesService.getAll(user)

      expect(result).toEqual([movie])
    })
  })

  describe('createOne', () => {
    const user = new User()
    user.id = 1
    const dto = { title: 'star wars' }

    test('should not create a movie when omdb request fails', async () => {
      fetchMock.mockImplementationOnce(async () => {
        throw new Error('error')
      })

      try {
        await moviesService.createOne(user, dto)
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(OmdbMovieException)
      }
    })

    test('should not create a movie when the user does not have premium and has created 5 movies this month', async () => {
      fetchMock.mockImplementationOnce(async () => ({
        json: async () => omdbMovieResponse
      }))
      getCount.mockImplementationOnce(async () => 5)
      hasPremium.mockReturnValueOnce(false)

      try {
        await moviesService.createOne(user, dto)
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(ExceededMaximumMoviesPerMonthException)
      }
    })

    test('should create a movie when user does not have premium and has created less than 5 movies this month', async () => {
      fetchMock.mockImplementationOnce(async () => ({
        json: async () => omdbMovieResponse
      }))
      getCount.mockImplementationOnce(async () => 4)
      hasPremium.mockReturnValueOnce(false)

      await moviesService.createOne(user, dto)

      expect(save).toHaveBeenCalledTimes(1)
    })

    test('should create a movie when user has premium and has created more than 5 movies this month', async () => {
      fetchMock.mockImplementationOnce(async () => ({
        json: async () => omdbMovieResponse
      }))
      getCount.mockImplementationOnce(async () => 5)
      hasPremium.mockReturnValueOnce(true)

      await moviesService.createOne(user, dto)
      expect(save).toHaveBeenCalledTimes(1)
    })
  })
})
