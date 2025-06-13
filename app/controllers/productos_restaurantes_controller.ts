import Pedido from '#models/pedido'
import type { HttpContext } from '@adonisjs/core/http'

export default class PedidosController {
  public async index({ response }: HttpContext) {
    const pedidos = await Pedido.all()
    return response.ok(pedidos)
  }

  public async show({ params, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    return response.ok(pedido)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['cliente_id', 'fecha', 'estado', 'total'])
    const pedido = await Pedido.create(data)
    return response.created(pedido)
  }

  public async update({ params, request, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    const data = request.only(['cliente_id', 'fecha', 'estado', 'total'])
    pedido.merge(data)
    await pedido.save()
    return response.ok(pedido)
  }

  public async destroy({ params, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    await pedido.delete()
    return response.noContent()
  }
}