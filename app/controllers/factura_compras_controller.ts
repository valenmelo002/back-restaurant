import type { HttpContext } from '@adonisjs/core/http'
import FacturaCompra from '../models/factura_compra.js'

export default class FacturaCompraController {
  // Listar todas las facturas con sus detalles
  public async index({}: HttpContext) {
    return await FacturaCompra.query().preload('detalles')
  }

  // Crear una nueva factura  
  public async store({ request, response }: HttpContext) {
    const data = request.only([
      'numeroFactura',
      'nit',
      'nombreEmpresa',
      'direccionEmpresa',
    ])
    const factura = await FacturaCompra.create(data)
    return response.created(factura)
  }

  // Mostrar una factura por id con sus detalles
  public async show({ params, response }: HttpContext) {
    const factura = await FacturaCompra.query()
      .where('id', params.id)
      .preload('detalles')
      .first()
    if (!factura) {
      return response.notFound({ message: 'Factura no encontrada' })
    }
    return response.ok(factura)
  }

  // Actualizar una factura
  public async update({ params, request, response }: HttpContext) {
    const factura = await FacturaCompra.find(params.id)
    if (!factura) {
      return response.notFound({ message: 'Factura no encontrada' })
    }
    const data = request.only([
      'numeroFactura',
      'nit',
      'nombreEmpresa',
      'direccionEmpresa',
    ])
    factura.merge(data)
    await factura.save()
    return response.ok(factura)
  }

  // Eliminar una factura
  public async destroy({ params, response }: HttpContext) {
    const factura = await FacturaCompra.find(params.id)
    if (!factura) {
      return response.notFound({ message: 'Factura no encontrada' })
    }
    await factura.delete()
    return response.ok({ message: 'Factura eliminada correctamente' })
  }
}
