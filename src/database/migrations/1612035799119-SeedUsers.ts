import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { Roles } from '../../roles/enums/roles.enum'
import { Role } from '../../roles/role.entity'
import { User } from '../../users/user.entity'

const basicRole = new Role()
basicRole.name = Roles.Basic

const basicUser = new User()
basicUser.firstName = 'William'
basicUser.lastName = 'Johnson'
basicUser.username = 'WillJ'
basicUser.email = 'william@johnson.com'
basicUser.passwordHash = '$2b$10$x8RS9AQVUytqCB3qzaXfgOHJh1noAxnuPTI/hHtpn41/.a6bEpY3K'
basicUser.movies = []
basicUser.roles = [basicRole]

const premiumRole = new Role()
premiumRole.name = Roles.Premium

const premiumUser = new User()
premiumUser.firstName = 'Michael'
premiumUser.lastName = 'Jackson'
premiumUser.username = 'MichJ'
premiumUser.email = 'michael@jackson.com'
premiumUser.passwordHash = '$2b$10$x8RS9AQVUytqCB3qzaXfgOHJh1noAxnuPTI/hHtpn41/.a6bEpY3K'
premiumUser.movies = []
premiumUser.roles = [premiumRole]

export class SeedUsers1612035799119 implements MigrationInterface {
    name = 'SeedUsers1612035799119'

    public async up(_queryRunner: QueryRunner): Promise<void> {
        const usersRepository = getRepository<User>('users')
        await usersRepository.save([basicUser, premiumUser])
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        const usersRepository = getRepository<User>('users')
        await usersRepository.remove([basicUser, premiumUser])
    }
}
