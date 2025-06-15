import type { HttpContext } from '@adonisjs/core/http'
import UserRole from '#models/user_roles'
import User from '#models/user'
import { createUserRoleValidator, updateUserRoleValidator } from '#validators/user_role'

export default class UserRoleController {
  // GET /user_roles?page=1&limit=10&nombre=juan
  async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nombre = request.input('nombre')

    const query = UserRole.query().preload('user', (query) => {
      query.preload('tipos_documentos')
    }).preload('roles')

    if (nombre) {
      query.whereHas('user', (userQuery) => {
        userQuery.whereILike('nombre', `%${nombre}%`)
      })
    }

    const paginated = await query.paginate(page, limit)

    return response.ok({
      data: paginated.all(),
      total: paginated.getMeta().total,
    })
  }

  // GET /user_roles/:id
  async get({ params, response }: HttpContext) {
    const userRole = await UserRole.query()
      .where('id', params.id)
      .preload('user', (query) => {
        query.preload('tipos_documentos')
      })
      .preload('roles')
      .firstOrFail()

    return response.ok(userRole)
  }

  // POST /user_roles
  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserRoleValidator)

    const user = await User.create({
      nombre: data.nombre,
      apellido: data.apellido,
      tipo_documento_id: data.tipo_documento_id,
      numero_documento: data.numero_documento,
      correo: data.correo,
      password: data.password, // se hashea automáticamente
      numero_telefono: data.numero_telefono,
    })

    const userRole = await UserRole.create({
      user_id: user.id,
      role_id: data.role_id,
    })

    await userRole.load('user')
    await userRole.load('roles')

    return response.created(userRole)
  }

  // PUT /user_roles/:id
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateUserRoleValidator)

    const userRole = await UserRole.findOrFail(params.id)
    await userRole.load('user')

    userRole.user.merge({
      nombre: data.nombre,
      apellido: data.apellido,
      tipo_documento_id: data.tipo_documento_id,
      numero_documento: data.numero_documento,
      correo: data.correo,
      numero_telefono: data.numero_telefono,
    })

    await userRole.user.save()

    if (data.role_id) {
      userRole.role_id = data.role_id
      await userRole.save()
    }

    await userRole.load('user')
    await userRole.load('roles')

    return response.ok(userRole)
  }

  // DELETE /user_roles/:id
  async destroy({ params, response }: HttpContext) {
    const userRole = await UserRole.findOrFail(params.id)
    await userRole.load('user')
    await userRole.user.delete()
    await userRole.delete()
    return response.noContent()
  }
}
