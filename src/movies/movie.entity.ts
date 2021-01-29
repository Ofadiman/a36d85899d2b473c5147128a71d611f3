import { Column, Entity, ManyToOne } from 'typeorm'

import { Base } from '../database/utils/base.entity'
import { User } from '../users/user.entity'

@Entity({ name: 'movies' })
export class Movie extends Base {
  @Column()
  public title: string

  @Column()
  public released: Date

  @Column()
  public genre: string

  @Column()
  public directory: string

  @ManyToOne(() => User, (user: User) => user.movies)
  public user: User
}
