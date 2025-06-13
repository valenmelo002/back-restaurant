import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'productos_restaurantes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100)
      table.decimal('precio', 10, 2)
      table.integer('categoria_restaurante_id').unsigned().references('id').inTable('categorias')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
