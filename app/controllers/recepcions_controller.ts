import type { HttpContext } from '@adonisjs/core/http'
import Recepcion from '#models/recepcion'
import { recepcionValidator, partialRecepcionValidator } from '#validators/recepcion_validator'

export default class RecepcionesController {
  async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nombreProducto = request.input('nombre')

    const query = Recepcion.query()
      .preload('producto')
      .preload('unidadMedida')
      .orderBy('created_at', 'desc')

    if (nombreProducto) {
      query.whereILike('producto.nombre', `%${nombreProducto}%`)
    }

    const paginated = await query.paginate(page, limit)

    return response.ok({
      data: paginated.all(),
      total: paginated.getMeta().total,
    })
  }

  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(recepcionValidator)

    const recepcion = await Recepcion.create(data)
    await recepcion.load('producto')
    await recepcion.load('unidadMedida')

    return response.created(recepcion)
  }

  async get({ params, response }: HttpContext) {
    const recepcion = await Recepcion.findOrFail(params.id)
    await recepcion.load('producto')
    await recepcion.load('unidadMedida')

    return response.ok(recepcion)
  }

  async update({ params, request, response }: HttpContext) {
    const recepcion = await Recepcion.findOrFail(params.id)
    const data = await request.validateUsing(recepcionValidator)

    recepcion.merge(data)
    await recepcion.save()
    await recepcion.load('producto')
    await recepcion.load('unidadMedida')

    return response.ok(recepcion)
  }

  async patch({ params, request, response }: HttpContext) {
    const recepcion = await Recepcion.findOrFail(params.id)
    const data = await request.validateUsing(partialRecepcionValidator)

    recepcion.merge(data)
    await recepcion.save()
    await recepcion.load('producto')
    await recepcion.load('unidadMedida')

    return response.ok(recepcion)
  }

  async destroy({ params, response }: HttpContext) {
    const recepcion = await Recepcion.findOrFail(params.id)
    await recepcion.delete()
    return response.noContent()
  }
}
