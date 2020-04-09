import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUser1586126391245 implements MigrationInterface {
  private tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'createdAt',
            type: 'datetime',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }
}
