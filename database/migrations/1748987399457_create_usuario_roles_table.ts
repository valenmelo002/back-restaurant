import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuario_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('usuario_id').unsigned().references('id').inTable('user').onDelete('CASCADE')
      table.integer('rol_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
