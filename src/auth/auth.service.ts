import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'

import { UserNotFoundException } from '../users/exceptions/user-not-found.exception'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { LoginResponseDto } from './dto/login-response.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception'

@Injectable()
export class AuthService {
  public constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  public async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { email, password, firstName, lastName, username } = registerUserDto

    const user = await this.usersService.getOne({ where: { email } })
    if (user) {
      throw new UserAlreadyExistsException()
    }

    const passwordHash = await hash(password, 10)

    await this.usersService.createOne({ email, firstName, lastName, passwordHash, username })
  }

  public async login(user: User): Promise<LoginResponseDto> {
    const accessToken = this.jwtService.sign({ sub: user.id })

    return { accessToken, user }
  }

  public async getAuthenticatedUserByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersService.getOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException()
    }

    await this.verifyPassword(password, user.passwordHash)

    return user
  }

  public async getAuthenticatedUserById(userId: number): Promise<User> {
    const user = await this.usersService.getOne({ where: { id: userId } })
    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }

  public async verifyPassword(plainTextPassword: string, passwordHash: string): Promise<void> {
    const isPasswordMatching = await compare(plainTextPassword, passwordHash)

    if (!isPasswordMatching) {
      throw new UnauthorizedException()
    }
  }
}
