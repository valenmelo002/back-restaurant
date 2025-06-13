import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UsuarioRol from '#models/usuario_roles'

export default class extends BaseSeeder {
  async run() {
    await UsuarioRol.createMany([
      { usuarioId: 1, rolId: 1 }, // Adso - mesero
      { usuarioId: 2, rolId: 2 }, // Juan - cocinero
      { usuarioId: 3, rolId: 3 }, // Ana - cajero
    ])
  }
}
