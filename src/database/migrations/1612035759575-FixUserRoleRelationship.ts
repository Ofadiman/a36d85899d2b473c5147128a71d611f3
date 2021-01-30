import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixUserRoleRelationship1612035759575 implements MigrationInterface {
    name = 'FixUserRoleRelationship1612035759575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "roles" DROP CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b"
        `)
        await queryRunner.query(`
            CREATE TABLE "users_roles_roles" (
                "users_id" integer NOT NULL,
                "roles_id" integer NOT NULL,
                CONSTRAINT "PK_27d0ca9155872fb087086b6a9f5" PRIMARY KEY ("users_id", "roles_id")
            )
        `)
        await queryRunner.query(`
            CREATE INDEX "IDX_178c6a2b971c18df6467eaf687" ON "users_roles_roles" ("users_id")
        `)
        await queryRunner.query(`
            CREATE INDEX "IDX_291889ab59fe7785020c96066e" ON "users_roles_roles" ("roles_id")
        `)
        await queryRunner.query(`
            ALTER TABLE "roles" DROP COLUMN "user_id"
        `)
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_178c6a2b971c18df6467eaf687a" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_291889ab59fe7785020c96066e9" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_291889ab59fe7785020c96066e9"
        `)
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_178c6a2b971c18df6467eaf687a"
        `)
        await queryRunner.query(`
            ALTER TABLE "roles"
            ADD "user_id" integer
        `)
        await queryRunner.query(`
            DROP INDEX "IDX_291889ab59fe7785020c96066e"
        `)
        await queryRunner.query(`
            DROP INDEX "IDX_178c6a2b971c18df6467eaf687"
        `)
        await queryRunner.query(`
            DROP TABLE "users_roles_roles"
        `)
        await queryRunner.query(`
            ALTER TABLE "roles"
            ADD CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }
}
