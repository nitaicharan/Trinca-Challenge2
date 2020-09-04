import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1627066061949 implements MigrationInterface {
    table = new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'new()',
            }
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
