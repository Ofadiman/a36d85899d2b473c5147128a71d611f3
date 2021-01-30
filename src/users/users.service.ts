import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'

import { Roles } from '../roles/enums/roles.enum'
import { Role } from '../roles/role.entity'
import { CreateOneUserDto } from './dto/create-one-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public async getOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(options)
  }

  public async createOne(createOneUserDto: CreateOneUserDto): Promise<User> {
    const user = this.usersRepository.create(createOneUserDto)
    const basicRole = new Role()
    basicRole.name = Roles.Basic
    basicRole.user = user
    user.roles = [basicRole]

    return this.usersRepository.save(user)
  }

  public getUserSubscriptionStatus(user: User): boolean {
    return user.roles.some(({ name }) => name === Roles.Premium)
  }
}
