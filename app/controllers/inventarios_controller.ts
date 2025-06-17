import type { HttpContext } from '@adonisjs/core/http'
import Inventario from '#models/inventario'
import { inventarioValidator, partialInventarioValidator } from '#validators/inventario_validator'

export default class InventariosController {
  async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nombreProducto = request.input('nombre')

    const query = Inventario.query()
      .preload('categoria')
      .preload('unidadMedida')
      .orderBy('created_at', 'desc')

    if (nombreProducto) {
      query.whereILike('nombre_producto', `%${nombreProducto}%`)
    }

    const paginated = await query.paginate(page, limit)

    return response.ok({
      data: paginated.all(),
      total: paginated.getMeta().total,
    })
  }

  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(inventarioValidator)

    const inventario = await Inventario.create(data)
    await inventario.load('categoria')
    await inventario.load('unidadMedida')

    return response.created(inventario)
  }

  async get({ params, response }: HttpContext) {
    const inventario = await Inventario.findOrFail(params.id)
    await inventario.load('categoria')
    await inventario.load('unidadMedida')

    return response.ok(inventario)
  }

  async update({ params, request, response }: HttpContext) {
    const inventario = await Inventario.findOrFail(params.id)
    const data = await request.validateUsing(inventarioValidator)

    inventario.merge(data)
    await inventario.save()
    await inventario.load('categoria')
    await inventario.load('unidadMedida')

    return response.ok(inventario)
  }

  async patch({ params, request, response }: HttpContext) {
    const inventario = await Inventario.findOrFail(params.id)
    const data = await request.validateUsing(partialInventarioValidator)

    inventario.merge(data)
    await inventario.save()
    await inventario.load('categoria')
    await inventario.load('unidadMedida')

    return response.ok(inventario)
  }

  async destroy({ params, response }: HttpContext) {
    const inventario = await Inventario.findOrFail(params.id)
    await inventario.delete()
    return response.noContent()
  }
}
