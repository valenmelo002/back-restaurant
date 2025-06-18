import UserRole from '#models/user_roles'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const userRole = await UserRole.createMany([
      {
        user_id: 1,
        role_id: 2,
      },
      {
        user_id: 2,
        role_id: 1,
      },
      {
        user_id: 3,
        role_id: 3,
      },
      {
        user_id: 4,
        role_id: 4,
      },
      {
        user_id: 5,
        role_id: 2,
      },
      {
        user_id: 5,
        role_id: 2,
      },
      {
        user_id: 6,
        role_id: 3,
      },
    ])
  }
}
