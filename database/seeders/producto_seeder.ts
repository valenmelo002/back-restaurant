import Producto from '#models/producto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const productos = await Producto.createMany([
      { nombre: 'res', categoria_id: '1' },
      { nombre: 'bagre', categoria_id: '10' },
      { nombre: 'leche', categoria_id: '3' },
      { nombre: 'colombiana', categoria_id: '2' },
      { nombre: 'tomate', categoria_id: '6' },
      { nombre: 'sal', categoria_id: '5' },
    ])
  }
}
