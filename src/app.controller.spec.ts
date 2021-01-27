import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  test('should return app status', () => {
    const response = appController.healthCheck()

    expect(response).toEqual(expect.any(String))
  })
})
