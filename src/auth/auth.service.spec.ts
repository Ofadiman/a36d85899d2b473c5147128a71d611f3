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
          useValue: {}
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
})
