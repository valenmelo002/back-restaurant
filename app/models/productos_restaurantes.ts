import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProductoRestaurante extends BaseModel {
  public static table = 'productos_restaurantes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare precio: number

  @column()
  declare categoria_restaurante_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
