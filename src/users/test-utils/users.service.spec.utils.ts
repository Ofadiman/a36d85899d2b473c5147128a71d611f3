import { RegisterUserDto } from '../../auth/dto/register-user.dto'
import { Roles } from '../../roles/enums/roles.enum'
import { Role } from '../../roles/role.entity'
import { CreateOneUserDto } from '../dto/create-one-user.dto'
import { User } from '../user.entity'

type GetTestUserOptions = { dto?: Partial<RegisterUserDto>; passwordHash?: string; role?: Roles }
type GetRoleOptions = { name: Roles; user: User }

const mocks = {
  create: jest.fn().mockName('create'),
  findOne: jest.fn().mockName('findOne'),
  save: jest.fn().mockName('save')
}

const registerUserDto: RegisterUserDto = {
  email: 'email@domain.com',
  firstName: 'qa',
  lastName: 'tester',
  password: 'password',
  username: 'qa master'
}

const createOneUserDto: CreateOneUserDto = {
  email: 'email@domain.com',
  firstName: 'qa',
  lastName: 'tester',
  passwordHash: 'IUzI1NiIsInR5cCI6',
  username: 'qa master'
}

const getRole = ({ name, user }: GetRoleOptions): Role => {
  const role = new Role()
  role.user = user
  role.name = name

  return role
}

const getUser = ({ dto, role, passwordHash }: GetTestUserOptions): User => {
  const user = new User()
  if (role !== undefined) {
    const userRole = getRole({ name: role, user })
    user.roles = [userRole]
  }
  user.id = 51
  user.email = dto?.email ?? registerUserDto.email
  user.firstName = dto?.firstName ?? registerUserDto.firstName
  user.lastName = dto?.lastName ?? registerUserDto.lastName
  user.passwordHash = passwordHash ?? 'IUzI1NiIsInR5cCI6'
  user.username = dto?.username ?? registerUserDto.username

  return user
}

const fn = {
  getRole,
  getUser
}

const dto = {
  createOneUserDto,
  registerUserDto
}

export const testUtils = {
  dto,
  fn,
  mocks
}
