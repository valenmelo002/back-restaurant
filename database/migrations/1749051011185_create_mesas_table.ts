import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mesas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('numero')
      table.enum('estado', ['disponible', 'asignada', 'ocupada'])
      table.bigInteger('mesero_id').unsigned().references('id').inTable('user')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
