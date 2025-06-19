import { BaseSeeder } from '@adonisjs/lucid/seeders'
import FacturaCompra from '#models/factura_compra'
import FacturaCompraDetalle from '#models/factura_compra_detalles'

export default class extends BaseSeeder {
  async run() {
    const factura1 = await FacturaCompra.findBy('numeroFactura', 1001)
    const factura2 = await FacturaCompra.findBy('numeroFactura', 1002)
    const factura3 = await FacturaCompra.findBy('numeroFactura', 1003)
    const factura4 = await FacturaCompra.findBy('numeroFactura', 1004)
    const factura5 = await FacturaCompra.findBy('numeroFactura', 1005)
    const factura6 = await FacturaCompra.findBy('numeroFactura', 1006)
    const factura7 = await FacturaCompra.findBy('numeroFactura', 1007)
    const factura8 = await FacturaCompra.findBy('numeroFactura', 1008)
    const factura9 = await FacturaCompra.findBy('numeroFactura', 1009)
    const factura10 = await FacturaCompra.findBy('numeroFactura', 1010)

    await FacturaCompraDetalle.createMany([
      {
        factura_compras_id: factura1?.id!, // <-- Este campo es obligatorio
        proveedor_id: 1,
        producto_id: 1,
        cantidad: 10,
        precio: 5000,
        subtotal: 50000,
      },
      {
        factura_compras_id: factura2?.id!,
        proveedor_id: 1,
        producto_id: 3,
        cantidad: 2,
        precio: 15000,
        subtotal: 30000,
      },
      {
        factura_compras_id: factura3?.id!,
        proveedor_id: 3,
        producto_id: 2,
        cantidad: 10,
        precio: 40000,
        subtotal: 50000,
      },
      {
        factura_compras_id: factura4?.id!,
        proveedor_id: 3,
        producto_id: 1,
        cantidad: 1,
        precio: 100000,
        subtotal: 100000,
      },
      {
        factura_compras_id: factura5?.id!,
        proveedor_id: 2,
        producto_id: 3,
        cantidad: 3,
        precio: 20000,
        subtotal: 60000,
      },
      {
        factura_compras_id: factura6?.id!,
        proveedor_id: 3,
        producto_id: 1,
        cantidad: 4,
        precio: 25000,
        subtotal: 100000,
      },
      {
        factura_compras_id: factura7?.id!,
        proveedor_id: 2,
        producto_id: 2,
        cantidad: 6,
        precio: 30000,
        subtotal: 180000,
      },
      {
        factura_compras_id: factura8?.id!,
        proveedor_id: 1,
        producto_id: 3,
        cantidad: 8,
        precio: 35000,
        subtotal: 280000,
      },
      {
        factura_compras_id: factura9?.id!,
        proveedor_id: 3,
        producto_id: 1,
        cantidad: 12,
        precio: 40000,
        subtotal: 480000,
      },
      {
        factura_compras_id: factura10?.id!,
        proveedor_id: 2,
        producto_id: 2,
        cantidad: 15,
        precio: 45000,
        subtotal: 675000,
      },
    ])
  }
}
