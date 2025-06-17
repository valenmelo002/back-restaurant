import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Categoria from './categoria.js'
import UnidadMedida from './unidad_medida.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Inventario extends BaseModel {
  public static table = 'inventarios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codigo: number

  @column()
  declare nombre_producto: string

  @column()
  declare categoria_id: number

  @column()
  declare unidad_medida_id: number

  @column()
  declare stock: number

  @column()
  declare min_stock: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime | null

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria_id',
  })
  declare categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => UnidadMedida, {
    foreignKey: 'unidad_medida_id',
  })
  declare unidadMedida: BelongsTo<typeof UnidadMedida>
}
