import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBarbecue1628550092176 implements MigrationInterface {

    table = new Table({
        name: 'barbecues',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            },
            {
                name: 'price',
                type: 'float',
            },
            {
                name: 'description',
                type: 'varchar',
                isNullable: true,
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'new()',
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }
}
