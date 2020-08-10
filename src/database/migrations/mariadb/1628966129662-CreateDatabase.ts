import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1628966129662 implements MigrationInterface {
    name = 'CreateDatabase1628966129662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`users\` DROP COLUMN \`password\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`users\`
            ADD \`password\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` DROP FOREIGN KEY \`FK_e9a778e982665303f152c01573d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` CHANGE \`user_id\` \`user_id\` char(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\`
            ADD CONSTRAINT \`FK_e9a778e982665303f152c01573d\` FOREIGN KEY (\`user_id\`) REFERENCES \`trincachallenge2\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` DROP FOREIGN KEY \`FK_e9a778e982665303f152c01573d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` CHANGE \`user_id\` \`user_id\` char(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\`
            ADD CONSTRAINT \`FK_e9a778e982665303f152c01573d\` FOREIGN KEY (\`user_id\`) REFERENCES \`trincachallenge2\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`users\` DROP COLUMN \`password\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`users\`
            ADD \`password\` float(12) NOT NULL
        `);
    }

}
