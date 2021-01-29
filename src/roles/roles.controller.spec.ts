import { Test, TestingModule } from '@nestjs/testing'

import { RolesController } from './roles.controller'

describe('RolesController', () => {
  let rolesController: RolesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController]
    }).compile()

    rolesController = module.get<RolesController>(RolesController)
  })

  it('should be defined', () => {
    expect(rolesController).toBeDefined()
  })
})
