import vine from '@vinejs/vine'

export const facturaCompraValidator = vine.compile(
  vine.object({
    numero_Factura: vine.number().positive().withoutDecimals().optional(),
    nit: vine.number().positive().withoutDecimals(),
    nombre_empresa: vine.string().trim().minLength(3).maxLength(255),
    direccion_empresa: vine.string().trim().minLength(3).maxLength(255),
  })
)

export const partialFacturaCompraValidator = vine.compile(
  vine.object({
    numero_factura: vine.number().positive().withoutDecimals().optional(),
    nit: vine.number().positive().withoutDecimals().optional(),
    nombre_empresa: vine.string().trim().minLength(3).maxLength(255).optional(),
    direccion_empresa: vine.string().trim().minLength(3).maxLength(255).optional(),
  })
)
