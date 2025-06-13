import type { HttpContext } from '@adonisjs/core/http'
import Pedido from '#models/pedidos_restaurante'

export default class PedidosController {
  // Listar todos los pedidos
  public async index({ response }: HttpContext) {
    const pedidos = await Pedido.all()
    return response.ok(pedidos)
  }

  // Mostrar un pedido por id
  public async show({ params, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    return response.ok(pedido)
  }

  // Crear un nuevo pedido
  public async store({ request, response }: HttpContext) {
    const data = request.only(['mesa_id', 'estado_cocina', 'estado_pago', 'fecha_hora', 'total'])
    const pedido = await Pedido.create(data)
    return response.created(pedido)
  }

  // Actualizar un pedido existente
  public async update({ params, request, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    const data = request.only(['mesa_id', 'estado_cocina', 'estado_pago', 'fecha_hora', 'total'])
    pedido.merge(data)
    await pedido.save()
    return response.ok(pedido)
  }

  // Eliminar un pedido
  public async destroy({ params, response }: HttpContext) {
    const pedido = await Pedido.find(params.id)
    if (!pedido) {
      return response.notFound({ message: 'Pedido no encontrado' })
    }
    await pedido.delete()
    return response.noContent()
  }
}
