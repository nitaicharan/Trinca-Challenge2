import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1628992379837 implements MigrationInterface {
    name = 'CreateDatabase1628992379837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`trincachallenge2\`.\`users\` (
                \`id\` char(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`trincachallenge2\`.\`authentications\` (
                \`id\` char(36) NOT NULL,
                \`role\` varchar(255) NOT NULL,
                \`refresh_token\` varchar(255) NULL,
                \`user_id\` char(36) NULL,
                UNIQUE INDEX \`REL_e9a778e982665303f152c01573\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`trincachallenge2\`.\`barbecues\` (
                \`id\` char(36) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`price\` float NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`trincachallenge2\`.\`barbecues_users\` (
                \`barbecue_id\` char(36) NOT NULL,
                \`user_id\` char(36) NOT NULL,
                INDEX \`IDX_ace6a2eeb0e2167105a80d583b\` (\`barbecue_id\`),
                INDEX \`IDX_9d20c0f6d713cd7e788aadb040\` (\`user_id\`),
                PRIMARY KEY (\`barbecue_id\`, \`user_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\`
            ADD CONSTRAINT \`FK_e9a778e982665303f152c01573d\` FOREIGN KEY (\`user_id\`) REFERENCES \`trincachallenge2\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`barbecues_users\`
            ADD CONSTRAINT \`FK_ace6a2eeb0e2167105a80d583be\` FOREIGN KEY (\`barbecue_id\`) REFERENCES \`trincachallenge2\`.\`barbecues\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`barbecues_users\`
            ADD CONSTRAINT \`FK_9d20c0f6d713cd7e788aadb0409\` FOREIGN KEY (\`user_id\`) REFERENCES \`trincachallenge2\`.\`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`barbecues_users\` DROP FOREIGN KEY \`FK_9d20c0f6d713cd7e788aadb0409\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`barbecues_users\` DROP FOREIGN KEY \`FK_ace6a2eeb0e2167105a80d583be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`trincachallenge2\`.\`authentications\` DROP FOREIGN KEY \`FK_e9a778e982665303f152c01573d\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_9d20c0f6d713cd7e788aadb040\` ON \`trincachallenge2\`.\`barbecues_users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ace6a2eeb0e2167105a80d583b\` ON \`trincachallenge2\`.\`barbecues_users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`trincachallenge2\`.\`barbecues_users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`trincachallenge2\`.\`barbecues\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_e9a778e982665303f152c01573\` ON \`trincachallenge2\`.\`authentications\`
        `);
        await queryRunner.query(`
            DROP TABLE \`trincachallenge2\`.\`authentications\`
        `);
        await queryRunner.query(`
            DROP TABLE \`trincachallenge2\`.\`users\`
        `);
    }

}
