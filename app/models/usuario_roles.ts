import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UsuarioRol extends BaseModel {
  public static table = 'usuario_roles'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare rolId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
