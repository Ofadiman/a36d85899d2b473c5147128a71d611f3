import { Test, TestingModule } from '@nestjs/testing'

import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

describe('RolesController', () => {
  let rolesController: RolesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [{ provide: RolesService, useValue: {} }]
    }).compile()

    rolesController = module.get<RolesController>(RolesController)
  })

  it('should be defined', () => {
    expect(rolesController).toBeDefined()
  })
})
