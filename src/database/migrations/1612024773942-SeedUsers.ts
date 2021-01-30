import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { Roles } from '../../roles/enums/roles.enum'
import { Role } from '../../roles/role.entity'
import { User } from '../../users/user.entity'

const basicRole = new Role()
basicRole.name = Roles.Basic

const premiumRole = new Role()
premiumRole.name = Roles.Premium

const users: User[] = [
    {
        createdAt: new Date('2021-01-30'),
        email: 'user1@domain.com',
        firstName: 'user',
        id: 1,
        lastName: 'one',
        movies: [],
        // asdf1234
        passwordHash: '$2b$10$x8RS9AQVUytqCB3qzaXfgOHJh1noAxnuPTI/hHtpn41/.a6bEpY3K',
        roles: [basicRole],
        updatedAt: new Date('2021-01-30'),
        username: 'user1'
    },
    {
        createdAt: new Date('2021-01-30'),
        email: 'user2@domain.com',
        firstName: 'user',
        id: 2,
        lastName: 'two',
        movies: [],
        // asdf1234
        passwordHash: '$2b$10$x8RS9AQVUytqCB3qzaXfgOHJh1noAxnuPTI/hHtpn41/.a6bEpY3K',
        roles: [premiumRole],
        updatedAt: new Date('2021-01-30'),
        username: 'user2'
    }
]

export class SeedUsers1612024773942 implements MigrationInterface {
    public async up(_queryRunner: QueryRunner): Promise<void> {
        const usersRepository = getRepository('users')
        await usersRepository.save(users[0])
        await usersRepository.save(users[1])
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        const usersRepository = getRepository('users')
        await usersRepository.delete([1, 2])
    }
}
