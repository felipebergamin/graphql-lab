import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1623622235490 implements MigrationInterface {
  private tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          default: 'gen_random_uuid()',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'firstName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'lastName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
        },
        {
          name: 'updatedAt',
          type: 'timestamp with time zone',
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(new Table({
      name: this.tableName,
    }))
  }

}
