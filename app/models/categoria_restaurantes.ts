import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CategoriaRestaurante extends BaseModel {
  public static table = 'categoria_restaurante'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
