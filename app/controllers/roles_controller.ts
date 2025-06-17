import type { HttpContext } from '@adonisjs/core/http'
import roles from '#models/roles'

export default class RolesController {
  public async list({ response }: HttpContext) {
    const allRoles = await roles.all()
    return response.ok(allRoles)
  }
}
