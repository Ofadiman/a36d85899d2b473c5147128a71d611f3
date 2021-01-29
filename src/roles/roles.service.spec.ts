import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Role } from './role.entity'
import { RolesService } from './roles.service'

describe('RolesService', () => {
  let rolesService: RolesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: {}
        }
      ]
    }).compile()

    rolesService = module.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(rolesService).toBeDefined()
  })
})
