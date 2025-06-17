import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PasswordResets extends BaseSchema {
  protected tableName = 'password_resets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('correo').notNullable()
      table.string('token').notNullable().unique()
      table.timestamp('created_at').notNullable()
      table.timestamp('expires_at').notNullable()
      table.boolean('used').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
