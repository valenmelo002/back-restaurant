import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Mesa from '#models/mesa'

export default class extends BaseSeeder {
  async run() {
    await Mesa.createMany([
      { numero: 1, estado: 'disponible', mesero_id: 1 },
      { numero: 2, estado: 'ocupada', mesero_id: 2 },
      { numero: 3, estado: 'asignada', mesero_id: 3 },
    ])
  }
}
