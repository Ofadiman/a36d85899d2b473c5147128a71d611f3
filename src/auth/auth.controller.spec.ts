import { Test, TestingModule } from '@nestjs/testing'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { testUtils } from './test-utils/auth.module.spec.utils'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: testUtils.mocks.authService }]
    }).compile()

    authController = module.get<AuthController>(AuthController)
  })

  afterEach(() => {
    Object.values(testUtils.mocks.authService).forEach((mock) => {
      mock.mockReset()
    })
  })

  test('should handle user registration', async () => {
    await authController.registerUser(testUtils.dto.registerUserDto)

    expect(testUtils.mocks.authService.registerUser).toHaveBeenCalledWith(testUtils.dto.registerUserDto)
  })
})
