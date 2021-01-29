import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMovies1611949282692 implements MigrationInterface {
    name = 'CreateMovies1611949282692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "released" TIMESTAMP NOT NULL,
                "genre" character varying NOT NULL,
                "directory" character varying NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "movies"
            ADD CONSTRAINT "FK_b16396310081b89594a4f2f2890" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "movies" DROP CONSTRAINT "FK_b16396310081b89594a4f2f2890"
        `)
        await queryRunner.query(`
            DROP TABLE "movies"
        `)
    }
}
