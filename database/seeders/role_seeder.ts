import Role from '#models/roles'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles = await Role.createMany([
      {
        nombre: 'Administrador',
      },
      {
        nombre: 'Cajero',
      },
      {
        nombre: 'Cocinero',
      },
      {
        nombre: 'Mesero',
      },
    ])
  }
}
