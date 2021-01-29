import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from './role.entity'

@Injectable()
export class RolesService {
  public constructor(@InjectRepository(Role) private readonly rolesRepository: Repository<Role>) {}
}
