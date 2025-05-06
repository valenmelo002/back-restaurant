import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Historico extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public codigo: number

  @column()
  public nombre_producto: string

  @column()
  public categoria: string

  @column()
  public stock: number

  @column()
  public min_stock: number

  @column()
  public u_m: string
}