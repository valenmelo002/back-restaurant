import vine from '@vinejs/vine'

export const facturaCompraDetalleValidator = vine.compile(
  vine.object({
    factura_compras_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('factura_compras').where('id', value).first()
        return !!row
      }),
    proveedor_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('proveedores').where('id', value).first()
        return !!row
      })
      .optional(),
    producto_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('productos').where('id', value).first()
        return !!row
      }),
    cantidad: vine.number().positive().withoutDecimals(),
    precio: vine.number().positive().withoutDecimals(),
    subtotal: vine.number().positive().withoutDecimals(),
  })
)

export const partialFacturaCompraDetalleValidator = vine.compile(
  vine.object({
    factura_compras_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('factura_compras').where('id', value).first()
        return !!row
      })
      .optional(),
    proveedor_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('proveedores').where('id', value).first()
        return !!row
      })
      .optional(),
    producto_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('productos').where('id', value).first()
        return !!row
      })
      .optional(),
    cantidad: vine.number().positive().withoutDecimals().optional(),
    precio: vine.number().positive().withoutDecimals().optional(),
    subtotal: vine.number().positive().withoutDecimals().optional(),
  })
)
