import Inventario from '#models/inventario'
import type { HttpContext } from '@adonisjs/core/http'

export default class InventoriesController {
  async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const name = request.input('name')

    const query = Inventario.query()

    if (name) {
      query.whereILike('nombre_producto', `%${name}%`)
    }

    const paginator = await query.paginate(page, limit)

    return response.ok({
      data: paginator.all(),
      total: paginator.getMeta().total,
    })
  }

  async create({ request, response }: HttpContext) {
    const data = request.only([
      'codigo',
      'nombre_producto',
      'categoria',
      'stock',
      'min_stock',
      'unidad_medida',
    ])
    const item = await Inventario.create(data)
    return response.created(item)
  }

  async get({ params, response }: HttpContext) {
    const item = await Inventario.findOrFail(params.id)
    return response.ok(item)
  }

  async update({ params, request, response }: HttpContext) {
    const item = await Inventario.findOrFail(params.id)
    const data = request.only([
      'codigo',
      'nombre_producto',
      'categoria',
      'stock',
      'min_stock',
      'unidad_medida',
    ])
    item.merge(data)
    await item.save()
    return response.ok(item)
  }

  async destroy({ params, response }: HttpContext) {
    const item = await Inventario.findOrFail(params.id)
    await item.delete()
    return response.noContent()
  }
}
