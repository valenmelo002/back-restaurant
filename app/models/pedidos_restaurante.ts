import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mesa_id: number

  @column()
  declare estado_cocina: 'pendiente' | 'en_preparacion' | 'listo' | 'entregado'

  @column()
  declare estado_pago: 'esperando_pago' | 'pagado' | 'cancelado'

  @column.dateTime()
  declare fecha_hora: DateTime

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}