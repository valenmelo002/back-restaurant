import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class HistorialPedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pedido_id: number

  @column()
  declare estado_anterior: string

  @column()
  declare estado_nuevo: string

  @column()
  declare campo_estado: 'estado_cocina' | 'estado_pago'

  @column.dateTime()
  declare fecha_hora: DateTime

  @column()
  declare usuario_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}