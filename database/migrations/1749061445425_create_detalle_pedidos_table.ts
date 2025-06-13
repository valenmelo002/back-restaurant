import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detalle_pedidos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pedido_id').unsigned().references('id').inTable('pedidos')
      table.integer('producto_id').unsigned().references('id').inTable('productos')
      table.integer('cantidad')
      table.decimal('precio_unitario', 10, 2)
      table.text('comentarios').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}