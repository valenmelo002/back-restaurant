import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import FacturaCompraDetalle from './factura_compra_detalles.js'

export default class FacturaCompra extends BaseModel {
  public static table = 'factura_compras'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'numero_factura' })
  public numeroFactura!: number

  @column({ columnName: 'nit' })
  public nit!: number

  @column({ columnName: 'nombre_empresa' })
  public nombreEmpresa!: string

  @column({ columnName: 'direccion_empresa' })
  public direccionEmpresa!: string

  @hasMany(() => FacturaCompraDetalle, {
    foreignKey: 'factura_compras_id',
  })
  public detalles!: HasMany<typeof FacturaCompraDetalle>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
