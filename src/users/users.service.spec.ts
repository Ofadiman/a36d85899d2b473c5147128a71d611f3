import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Roles } from '../roles/enums/roles.enum'
import { Role } from '../roles/role.entity'
import { testUtils } from './test-utils/users.service.spec.utils'
import { User } from './user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: testUtils.mocks.create,
            findOne: testUtils.mocks.findOne,
            save: testUtils.mocks.save
          }
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {
            findOne: jest.fn().mockName('findOne')
          }
        }
      ]
    }).compile()

    usersService = module.get<UsersService>(UsersService)
  })

  describe('getOne', () => {
    const testUser = testUtils.fn.getUser({ role: Roles.Basic })

    test('should return user', async () => {
      testUtils.mocks.findOne.mockReturnValueOnce(testUser)

      const findOneOptions = { where: { email: testUser.email } }
      const user = await usersService.getOne(findOneOptions)

      expect(user).toEqual(testUser)
      expect(testUtils.mocks.findOne).toHaveBeenCalledWith(findOneOptions)
    })

    test('should return `undefined` if no user matches given condition', async () => {
      testUtils.mocks.findOne.mockReturnValueOnce(undefined)

      const findOneOptions = { where: { email: testUser.email } }
      const user = await usersService.getOne(findOneOptions)

      expect(user).toBeUndefined()
      expect(testUtils.mocks.findOne).toHaveBeenCalledWith(findOneOptions)
    })
  })

  describe('createOne', () => {
    const passwordHash = 'afb13sajgbifoiugb3'
    const testUser = testUtils.fn.getUser({ passwordHash })

    test('should save user', async () => {
      testUtils.mocks.create.mockReturnValueOnce(testUser)
      testUtils.mocks.save.mockReturnValueOnce(testUser)

      const user = await usersService.createOne(testUtils.dto.createOneUserDto)

      expect(user).toEqual(testUser)
      expect(testUtils.mocks.create).toHaveBeenCalledWith(testUtils.dto.createOneUserDto)
      expect(testUtils.mocks.save).toHaveBeenCalledWith(testUser)
    })
  })

  describe('hasPremium', () => {
    test('should return "true" if user has premium account', () => {
      const testUser = testUtils.fn.getUser({ role: Roles.Premium })

      const hasPremium = usersService.hasPremium(testUser)
      expect(hasPremium).toEqual(true)
    })

    test('should return "false" if user does not have premium account', () => {
      const testUser = testUtils.fn.getUser({ role: Roles.Basic })

      const hasPremium = usersService.hasPremium(testUser)
      expect(hasPremium).toEqual(false)
    })
  })
})
