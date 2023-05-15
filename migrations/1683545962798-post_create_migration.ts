import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostCreateMigration1683545962798 implements MigrationInterface {
  name = 'PostCreateMigration1683545962798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL, "title" character varying NOT NULL, "message" text NOT NULL, "message_for_mobile" character varying NOT NULL, "preview" character varying NOT NULL, "image_id" character varying NOT NULL, "author_id" character varying NOT NULL, "post_type" character varying NOT NULL, "is_published" boolean NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_type" ("id" uuid NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_fbd367b0f90f065f0e54f858a6a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post_type"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
