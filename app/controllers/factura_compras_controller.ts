import type { HttpContext } from '@adonisjs/core/http'
import FacturaCompra from '../models/factura_compra.js'
import FacturaCompraDetalle from '../models/detallefactura_compra.js'

export default class FacturaCompraController {
  
  public async index({}: HttpContext) {
    return await FacturaCompra.query().preload('detalles')
  }

  public async store({ request, response }: HttpContext) {
    const facturaData = request.only([
      'numeroFactura',
      'nit',
      'nombreEmpresa',
      'direccionEmpresa',
    ])
    const detalles = request.input('detalles') // Array de detalles

    const factura = await FacturaCompra.create(facturaData)

    if (Array.isArray(detalles)) {
      for (const detalle of detalles) {
        await FacturaCompraDetalle.create({
          ...detalle,
          encabezado_factura_compra: factura.id,
        })
      }
    }

    await factura.load('detalles')
    return response.created(factura)
  }

  public async show({ params }: HttpContext) {
    return await FacturaCompra.query()
      .where('id', params.id)
      .preload('detalles')
      .firstOrFail()
  }

  public async update({ params, request, response }: HttpContext) {
    const factura = await FacturaCompra.findOrFail(params.id)
    const facturaData = request.only([
      'numeroFactura',
      'nit',
      'nombreEmpresa',
      'direccionEmpresa',
    ])
    factura.merge(facturaData)
    await factura.save()


    await factura.load('detalles')
    return response.ok(factura)
  }

  public async destroy({ params, response }: HttpContext) {
    const factura = await FacturaCompra.findOrFail(params.id)
    await FacturaCompraDetalle.query().where('encabezado_factura_compra', factura.id).delete()
    await factura.delete()
    return response.noContent()
  }
}