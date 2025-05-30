import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import FacturaCompraDetalle from './detallefactura_compra.js'

export default class FacturaCompra extends BaseModel {
  public static table = 'factura_compras'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'numeroFactura' })
  public numeroFactura!: number

  @column({ columnName: 'nit' })
  public nit!: number

  @column({ columnName: 'nombreEmpresa' })
  public nombreEmpresa!: string

  @column({ columnName: 'direccionEmpresa' })
  public direccionEmpresa!: string

  @hasMany(() => FacturaCompraDetalle, {
    foreignKey: 'encabezado_factura_compra',
  })
  public detalles!: HasMany<typeof FacturaCompraDetalle>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}