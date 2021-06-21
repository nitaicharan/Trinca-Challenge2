import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAuthentication1628564364382 implements MigrationInterface {

    private foreignKeys: TableForeignKey[] = [
        new TableForeignKey({
            name: 'fk_authorizations_users',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
        }),
    ]

    private table = new Table({
        name: 'authentications',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            },
            {
                name: 'user_id',
                type: 'uuid',
            },
            {
                name: 'role',
                type: 'varchar',
            },
            {
                name: 'refresh_token',
                type: 'varchar',
                isNullable: true,
            },
        ],
        foreignKeys: this.foreignKeys,
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }
}
