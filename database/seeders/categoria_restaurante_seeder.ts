import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CategoriaRestaurante from '#models/categoria_restaurantes'

export default class extends BaseSeeder {
  async run() {
    await CategoriaRestaurante.createMany([
      { nombre: 'Entradas' },
      { nombre: 'Platos fuertes' },
      { nombre: 'Bebidas' },
      { nombre: 'Postres' },
    ])
  }
}
