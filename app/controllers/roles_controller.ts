import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'

const allowedRoles = ['mesero', 'cocinero', 'cajero']

export default class RolesController {
  public async index({ response }: HttpContext) {
    const roles = await Role.all()
    return response.ok(roles)
  }

  public async show({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.notFound({ message: 'Rol no encontrado' })
    }
    return response.ok(role)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nombre'])
    if (!allowedRoles.includes(data.nombre)) {
      return response.badRequest({ message: 'Rol no permitido' })
    }
    const role = await Role.create(data)
    return response.created(role)
  }

  public async update({ params, request, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.notFound({ message: 'Rol no encontrado' })
    }
    const data = request.only(['nombre'])
    if (!allowedRoles.includes(data.nombre)) {
      return response.badRequest({ message: 'Rol no permitido' })
    }
    role.merge(data)
    await role.save()
    return response.ok(role)
  }

  public async destroy({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.notFound({ message: 'Rol no encontrado' })
    }
    await role.delete()
    return response.noContent()
  }
}
