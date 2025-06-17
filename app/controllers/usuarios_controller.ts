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

    const query = User.query()
      .preload('tipos_documentos')
      .preload('userRoles', (query) => {
        query.preload('roles')
      })

    if (nombre) {
      query.whereILike('nombre', `%${nombre}%`)
    }

    const paginated = await query.paginate(page, limit)

    return response.ok({
      data: paginated.all(),
      total: paginated.getMeta().total,
    })
  }

  // GET /user_roles/:id
  async get({ params, response }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .preload('tipos_documentos')
      .preload('userRoles', (query) => {
        query.preload('roles')
      })
      .firstOrFail()

    return response.ok(user)
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
      password: data.password,
      numero_telefono: data.numero_telefono,
    })

    await Promise.all(
      data.role_ids.map((roleId) =>
        UserRole.create({ user_id: user.id, role_id: roleId })
      )
    )

    const userWithRoles = await User.query()
      .where('id', user.id)
      .preload('tipos_documentos')
      .preload('userRoles', (query) => {
        query.preload('roles')
      })
      .firstOrFail()

    return response.created(userWithRoles)
  }

  // PUT /user_roles/:id
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateUserRoleValidator)

    const user = await User.findOrFail(params.id)

    user.merge({
      nombre: data.nombre,
      apellido: data.apellido,
      tipo_documento_id: data.tipo_documento_id,
      numero_documento: data.numero_documento,
      correo: data.correo,
      numero_telefono: data.numero_telefono,
    })
    await user.save()

    // Eliminar roles anteriores
    await UserRole.query().where('user_id', user.id).delete()

    // Insertar nuevos roles
    await Promise.all(
      data.role_ids.map((roleId) =>
        UserRole.create({ user_id: user.id, role_id: roleId })
      )
    )

    const userWithRoles = await User.query()
      .where('id', user.id)
      .preload('tipos_documentos')
      .preload('userRoles', (query) => {
        query.preload('roles')
      })
      .firstOrFail()

    return response.ok(userWithRoles)
  }

  // DELETE /user_roles/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      await UserRole.query().where('user_id', user.id).delete()
      await user.delete()

      return response.noContent()
    } catch (error) {
      console.error('❌ Error al eliminar usuario y relación:', error)
      return response.internalServerError({
        message: 'No se pudo eliminar el usuario o su relación con el rol.',
      })
    }
  }
}
