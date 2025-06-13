import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DetallePedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pedido_id: number

  @column()
  declare producto_id: number

  @column()
  declare cantidad: number

  @column()
  declare precio_unitario: number

  @column()
  declare comentarios?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
