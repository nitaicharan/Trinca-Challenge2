import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1628693945442 implements MigrationInterface {
    name = 'CreateDatabase1628693945442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "authentications" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "refresh_token" varchar, "user_id" varchar, CONSTRAINT "REL_e9a778e982665303f152c01573" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "barbecues" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "barbecues_users" ("barbecue_id" varchar NOT NULL, "user_id" varchar NOT NULL, PRIMARY KEY ("barbecue_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ace6a2eeb0e2167105a80d583b" ON "barbecues_users" ("barbecue_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d20c0f6d713cd7e788aadb040" ON "barbecues_users" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_authentications" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "refresh_token" varchar, "user_id" varchar, CONSTRAINT "REL_e9a778e982665303f152c01573" UNIQUE ("user_id"), CONSTRAINT "FK_e9a778e982665303f152c01573d" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_authentications"("id", "role", "refresh_token", "user_id") SELECT "id", "role", "refresh_token", "user_id" FROM "authentications"`);
        await queryRunner.query(`DROP TABLE "authentications"`);
        await queryRunner.query(`ALTER TABLE "temporary_authentications" RENAME TO "authentications"`);
        await queryRunner.query(`DROP INDEX "IDX_ace6a2eeb0e2167105a80d583b"`);
        await queryRunner.query(`DROP INDEX "IDX_9d20c0f6d713cd7e788aadb040"`);
        await queryRunner.query(`CREATE TABLE "temporary_barbecues_users" ("barbecue_id" varchar NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "FK_ace6a2eeb0e2167105a80d583be" FOREIGN KEY ("barbecue_id") REFERENCES "barbecues" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_9d20c0f6d713cd7e788aadb0409" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("barbecue_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_barbecues_users"("barbecue_id", "user_id") SELECT "barbecue_id", "user_id" FROM "barbecues_users"`);
        await queryRunner.query(`DROP TABLE "barbecues_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_barbecues_users" RENAME TO "barbecues_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_ace6a2eeb0e2167105a80d583b" ON "barbecues_users" ("barbecue_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d20c0f6d713cd7e788aadb040" ON "barbecues_users" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_9d20c0f6d713cd7e788aadb040"`);
        await queryRunner.query(`DROP INDEX "IDX_ace6a2eeb0e2167105a80d583b"`);
        await queryRunner.query(`ALTER TABLE "barbecues_users" RENAME TO "temporary_barbecues_users"`);
        await queryRunner.query(`CREATE TABLE "barbecues_users" ("barbecue_id" varchar NOT NULL, "user_id" varchar NOT NULL, PRIMARY KEY ("barbecue_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "barbecues_users"("barbecue_id", "user_id") SELECT "barbecue_id", "user_id" FROM "temporary_barbecues_users"`);
        await queryRunner.query(`DROP TABLE "temporary_barbecues_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_9d20c0f6d713cd7e788aadb040" ON "barbecues_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ace6a2eeb0e2167105a80d583b" ON "barbecues_users" ("barbecue_id") `);
        await queryRunner.query(`ALTER TABLE "authentications" RENAME TO "temporary_authentications"`);
        await queryRunner.query(`CREATE TABLE "authentications" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "refresh_token" varchar, "user_id" varchar, CONSTRAINT "REL_e9a778e982665303f152c01573" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "authentications"("id", "role", "refresh_token", "user_id") SELECT "id", "role", "refresh_token", "user_id" FROM "temporary_authentications"`);
        await queryRunner.query(`DROP TABLE "temporary_authentications"`);
        await queryRunner.query(`DROP INDEX "IDX_9d20c0f6d713cd7e788aadb040"`);
        await queryRunner.query(`DROP INDEX "IDX_ace6a2eeb0e2167105a80d583b"`);
        await queryRunner.query(`DROP TABLE "barbecues_users"`);
        await queryRunner.query(`DROP TABLE "barbecues"`);
        await queryRunner.query(`DROP TABLE "authentications"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
