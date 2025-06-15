import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('codigo').notNullable()
      table.string('nombre_producto').notNullable()

      table
        .integer('categoria_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categorias')
        .onDelete('CASCADE')

      table
        .integer('unidad_medida_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('unidades_medida')
        .onDelete('CASCADE')

      table.integer('stock').notNullable()
      table.integer('min_stock').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
