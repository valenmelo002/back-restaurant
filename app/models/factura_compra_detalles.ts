import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import FacturaCompra from './factura_compra.js'

export default class FacturaCompraDetalle extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public factura_compras_id!: number

  @column()
  public proveedor_id!: number

  @column()
  public producto_id!: number

  @column()
  public cantidad!: number

  @column()
  public precio!: number

  @column()
  public subtotal!: number

  @belongsTo(() => FacturaCompra, {
    foreignKey: 'factura_compras_id',
  })
  public factura!: BelongsTo<typeof FacturaCompra>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
