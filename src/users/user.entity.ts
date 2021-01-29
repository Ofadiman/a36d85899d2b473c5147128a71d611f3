import { Column, Entity } from 'typeorm'

import { Base } from '../database/utils/base.entity'

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ unique: true })
  public email: string

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public username: string

  @Column()
  public passwordHash: string
}
