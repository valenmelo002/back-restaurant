import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'historial_pedidos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pedido_id').unsigned().references('id').inTable('pedidos')
      table.string('estado_anterior', 50)
      table.string('estado_nuevo', 50)
      table.enum('campo_estado', ['estado_cocina', 'estado_pago'])
      table.dateTime('fecha_hora')
      table.bigInteger('usuario_id').unsigned().references('id').inTable('user')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
