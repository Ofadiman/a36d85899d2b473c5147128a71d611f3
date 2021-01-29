import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'

import { CreateOneUserDto } from './dto/create-one-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public async getOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(options)
  }

  public async createOne(createOneUserDto: CreateOneUserDto): Promise<User> {
    return this.usersRepository.save(createOneUserDto)
  }
}
