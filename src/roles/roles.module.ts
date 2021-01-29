import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from './role.entity'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
  controllers: [RolesController],
  exports: [RolesService],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService]
})
export class RolesModule {}
