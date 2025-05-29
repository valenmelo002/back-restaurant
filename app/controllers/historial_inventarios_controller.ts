import type { HttpContext } from '@adonisjs/core/http'
import HistorialInventario from '#models/historial_inventario'

export default class HistorialInventariosController {
  public async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const productoNombre = request.input('producto')

    const query = HistorialInventario.query().preload('producto')

    if (productoNombre) {
      query.whereHas('producto', (q) => {
        q.whereILike('nombre', `%${productoNombre}%`)
      })
    }

    query.orderBy('fecha', 'desc')

    const paginated = await query.paginate(page, limit)

    return response.ok({
      data: paginated.all(),
      total: paginated.getMeta().total,
    })
  }

  public async create({ request, response }: HttpContext) {
    const data = request.only([
      'producto_id',
      'tipo_movimiento',
      'cantidad',
      'fecha',
      'descripcion',
    ])

    const historial = await HistorialInventario.create(data)
    await historial.load('producto')

    return response.created(historial)
  }

  public async get({ params, response }: HttpContext) {
    const historial = await HistorialInventario.findOrFail(params.id)
    await historial.load('producto')

    return response.ok(historial)
  }

  // DELETE /historial-inventario/:id
  public async destroy({ params, response }: HttpContext) {
    const historial = await HistorialInventario.findOrFail(params.id)
    await historial.delete()

    return response.noContent()
  }
}
