import type { HttpContext } from '@adonisjs/core/http'
import Mesa from '#models/mesa'

export default class MesasController {
  public async index({ response }: HttpContext) {
    const mesas = await Mesa.all()
    return response.ok(mesas)
  }

  public async show({ params, response }: HttpContext) {
    const mesa = await Mesa.query()
      .where('id', params.id)
      .select('id', 'numero', 'estado', 'mesero_id', 'created_at', 'updated_at')
      .first()

    if (!mesa) {
      return response.notFound({ message: 'Mesa not found' })
    }
    return response.ok(mesa)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['numero', 'estado', 'mesero_id'])
    const mesa = await Mesa.create(data)
    return response.created(mesa)
  }

  public async update({ params, request, response }: HttpContext) {
    const mesa = await Mesa.find(params.id)
    if (!mesa) {
      return response.notFound({ message: 'Mesa not found' })
    }
    const data = request.only(['numero', 'estado', 'mesero_id'])
    mesa.merge(data)
    await mesa.save()
    return response.ok(mesa)
  }

  public async destroy({ params, response }: HttpContext) {
    const mesa = await Mesa.find(params.id)
    if (!mesa) {
      return response.notFound({ message: 'Mesa not found' })
    }
    await mesa.delete()
    return response.noContent()
  }
}
