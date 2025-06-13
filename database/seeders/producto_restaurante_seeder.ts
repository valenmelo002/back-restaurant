import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProductoRestaurante from '#models/productos_restaurantes'

export default class extends BaseSeeder {
  async run() {
    await ProductoRestaurante.createMany([
      // Categoría 1: Entradas
      { nombre: 'Empanadas', precio: 4000, categoria_restaurante_id: 1 },
      { nombre: 'Dedos de queso', precio: 6000, categoria_restaurante_id: 1 },
      { nombre: 'Patacones', precio: 5000, categoria_restaurante_id: 1 },

      // Categoría 2: Platos fuertes
      { nombre: 'Hamburguesa', precio: 15000, categoria_restaurante_id: 2 },
      { nombre: 'Pollo asado', precio: 18000, categoria_restaurante_id: 2 },
      { nombre: 'Bandeja paisa', precio: 20000, categoria_restaurante_id: 2 },

      // Categoría 3: Bebidas
      { nombre: 'Jugo de naranja', precio: 5000, categoria_restaurante_id: 3 },
      { nombre: 'Gaseosa', precio: 4000, categoria_restaurante_id: 3 },
      { nombre: 'Agua', precio: 3000, categoria_restaurante_id: 3 },

      // Categoría 4: Postres
      { nombre: 'Flan', precio: 6000, categoria_restaurante_id: 4 },
      { nombre: 'Helado', precio: 7000, categoria_restaurante_id: 4 },
      { nombre: 'Torta de chocolate', precio: 8000, categoria_restaurante_id: 4 },
    ])
  }
}
