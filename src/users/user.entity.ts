import { Column, Entity, OneToMany } from 'typeorm'

import { Base } from '../database/utils/base.entity'
import { Movie } from '../movies/movie.entity'
import { Role } from '../roles/role.entity'

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

  @OneToMany(() => Role, (role: Role) => role.user)
  public roles: Role[]

  @OneToMany(() => Movie, (movie: Movie) => movie.user)
  public movies: Movie[]
}
