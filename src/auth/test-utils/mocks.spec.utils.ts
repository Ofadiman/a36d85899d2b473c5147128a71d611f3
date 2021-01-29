const usersService = {
  createOne: jest.fn().mockName('createOne'),
  getOne: jest.fn().mockName('getOne')
}

const authService = {
  registerUser: jest.fn().mockName('registerUser')
}

export const mocks = {
  authService,
  usersService
}
