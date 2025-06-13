import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('mesa_id').unsigned().references('id').inTable('mesas')
      table.enum('estado_cocina', ['pendiente', 'en_preparacion', 'listo', 'entregado'])
      table.enum('estado_pago', ['esperando_pago', 'pagado', 'cancelado'])
      table.dateTime('fecha_hora')
      table.decimal('total', 10, 2)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}