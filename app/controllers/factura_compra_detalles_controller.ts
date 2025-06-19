import type { HttpContext } from '@adonisjs/core/http'
import FacturaCompraDetalle from '../models/factura_compra_detalles.js'

export default class FacturaCompraDetallesController {
  public async index({ response }: HttpContext) {
    const detalles = await FacturaCompraDetalle.all()
    return response.ok(detalles)
  }

  public async show({ params, response }: HttpContext) {
    const detalle = await FacturaCompraDetalle.find(params.id)
    if (!detalle) {
      return response.notFound({ message: 'Detalle no encontrado' })
    }
    return response.ok(detalle)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only([
      'factura_compras_id',
      'proveedor_id',
      'producto_id',
      'cantidad',
      'precio',
      'subtotal',
    ])
    if (typeof data.proveedor_id === 'undefined') {
      data.proveedor_id = null
    }
    const detalle = await FacturaCompraDetalle.create(data)
    return response.created(detalle)
  }

  public async update({ params, request, response }: HttpContext) {
    const detalle = await FacturaCompraDetalle.find(params.id)
    if (!detalle) {
      return response.notFound({ message: 'Detalle no encontrado' })
    }
    const data = request.only([
      'factura_compras_id',
      'proveedor_id',
      'producto_id',
      'cantidad',
      'precio',
      'subtotal',
    ])
    detalle.merge(data)
    await detalle.save()
    return response.ok(detalle)
  }

  public async destroy({ params, response }: HttpContext) {
    const detalle = await FacturaCompraDetalle.find(params.id)
    if (!detalle) {
      return response.notFound({ message: 'Detalle no encontrado' })
    }
    await detalle.delete()
    return response.ok({ message: 'Detalle eliminado correctamente' })
  }
}
