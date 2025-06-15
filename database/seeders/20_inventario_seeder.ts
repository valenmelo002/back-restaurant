import Inventario from '#models/inventario'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    await Inventario.createMany([
      {
        codigo: 1,
        nombre_producto: 'cerveza',
        categoria_id: 2,
        stock: 100,
        min_stock: 10,
        unidad_medida_id: 4,
      },
      {
        codigo: 2,
        nombre_producto: 'cerdo',
        categoria_id: 1,
        stock: 100,
        min_stock: 10,
        unidad_medida_id: 1,
      },
      {
        codigo: 3,
        nombre_producto: 'tomate',
        categoria_id: 7,
        stock: 100,
        min_stock: 10,
        unidad_medida_id: 2,
      },
      {
        codigo: 4,
        nombre_producto: 'arroz',
        categoria_id: 4,
        stock: 100,
        min_stock: 10,
        unidad_medida_id: 1,
      },
      {
        codigo: 5,
        nombre_producto: 'queso',
        categoria_id: 3,
        stock: 100,
        min_stock: 10,
        unidad_medida_id: 2,
      },
    ])
  }
}
