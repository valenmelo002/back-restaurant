import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Historicos extends BaseSchema {
  protected tableName = 'historicos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('codigo').notNullable()
      table.string('nombre_producto').notNullable()
      table.string('categoria').notNullable()
      table.integer('stock').notNullable()
      table.integer('min_stock').notNullable()
      table.string('u_m').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}