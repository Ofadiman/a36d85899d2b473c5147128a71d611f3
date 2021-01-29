import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

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
          useValue: {}
        }
      ]
    }).compile()

    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })
})
