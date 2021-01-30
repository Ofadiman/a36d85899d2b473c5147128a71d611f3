import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import bcrypt from 'bcrypt'

import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception'
import { testUtils } from './test-utils/auth.module.spec.utils'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: testUtils.mocks.usersService
        },
        {
          provide: JwtService,
          useValue: testUtils.mocks.jwtService
        }
      ]
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    Object.values(testUtils.mocks.usersService).forEach((mock) => {
      mock.mockReset()
    })
  })

  describe('registerUser', () => {
    test('should throw an error when user with provided email already exists', async () => {
      testUtils.mocks.usersService.getOne.mockReturnValueOnce(new User())

      try {
        await authService.registerUser(testUtils.dto.registerUserDto)
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(UserAlreadyExistsException)
      }
    })

    test('should register a new user', async () => {
      const passwordHash = 'foaiuwbvoiywbgawoy4gf27hgo283g8b8'
      testUtils.mocks.usersService.getOne.mockReturnValueOnce(undefined)
      const hashSpy = jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
        new Promise((resolve) => {
          resolve(passwordHash)
        })
      )

      await authService.registerUser(testUtils.dto.registerUserDto)

      const { password, ...rest } = testUtils.dto.registerUserDto
      expect(testUtils.mocks.usersService.createOne).toHaveBeenCalledWith({ ...rest, passwordHash })
      hashSpy.mockRestore()
    })
  })

  describe('login', () => {
    test('should return login response', async () => {
      const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTYxMjAwNjQyNywiZXhwIjoxNjEyMD'
      testUtils.mocks.jwtService.sign.mockReturnValueOnce(mockJwt)
      const response = await authService.login(testUtils.entities.user)

      expect(response).toEqual({ accessToken: mockJwt, user: testUtils.entities.user })
      expect(testUtils.mocks.jwtService.sign).toHaveBeenCalledWith({ sub: testUtils.entities.user.id })
    })
  })

  describe('getAuthenticatedUserByEmail', () => {
    test('should throw an error when user does not exist', async () => {
      testUtils.mocks.usersService.getOne.mockImplementationOnce(async () => undefined)

      try {
        await authService.getAuthenticatedUserByEmail('user@domain.com', 'adsf')
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(UnauthorizedException)
      }
    })

    test('should throw an error when user password is incorrect', async () => {
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => false)
      testUtils.mocks.usersService.getOne.mockImplementationOnce(async () => testUtils.entities.user)

      try {
        await authService.getAuthenticatedUserByEmail('user@domain.com', 'adsf')
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(UnauthorizedException)
      }

      compareSpy.mockRestore()
    })

    test('should return authenticated user', async () => {
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => true)
      testUtils.mocks.usersService.getOne.mockImplementationOnce(async () => testUtils.entities.user)

      const user = await authService.getAuthenticatedUserByEmail('user@domain.com', 'adsf')

      expect(user).toEqual(testUtils.entities.user)
      compareSpy.mockRestore()
    })
  })

  describe('getAuthenticatedUserById', () => {
    test('should throw an error when user does not exist', async () => {
      testUtils.mocks.usersService.getOne.mockImplementationOnce(async () => undefined)

      try {
        await authService.getAuthenticatedUserById(testUtils.entities.user.id)
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(UnauthorizedException)
      }
    })

    test('should return authenticated user', async () => {
      testUtils.mocks.usersService.getOne.mockImplementationOnce(async () => testUtils.entities.user)

      const response = await authService.getAuthenticatedUserById(testUtils.entities.user.id)
      expect(response).toEqual(testUtils.entities.user)
    })
  })
})
