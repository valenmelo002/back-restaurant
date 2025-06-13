import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Mesa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: number

  @column()
  declare estado: string

  @column()
  declare mesero_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}