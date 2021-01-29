import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { UsersService } from '../users/users.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception'

@Injectable()
export class AuthService {
  public constructor(private readonly usersService: UsersService) {}

  public async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { email, password, firstName, lastName, username } = registerUserDto

    const user = await this.usersService.getOne({ where: { email } })
    if (user) {
      throw new UserAlreadyExistsException()
    }

    const passwordHash = await hash(password, 10)

    await this.usersService.createOne({ email, firstName, lastName, passwordHash, username })
  }
}
