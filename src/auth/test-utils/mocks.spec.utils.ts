const usersService = {
  createOne: jest.fn().mockName('createOne'),
  getOne: jest.fn().mockName('getOne')
}

const authService = {
  login: jest.fn().mockName('login'),
  registerUser: jest.fn().mockName('registerUser')
}

const jwtService = {
  sign: jest.fn().mockName('sign')
}

export const mocks = {
  authService,
  jwtService,
  usersService
}
