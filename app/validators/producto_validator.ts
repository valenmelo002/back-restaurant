import vine from '@vinejs/vine'

export const productoValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255),
    descripcion: vine.string().trim().maxLength(40).optional(),
    precio: vine.number().positive().withoutDecimals(),
    categoria_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('categorias').where('id', value).first()
        return !!row
      }),
    unidad_medida_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('unidad_medidas').where('id', value).first()
        return !!row
      }),
    disponible: vine.boolean().optional(),
  })
)

export const partialProductoValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255).optional(),
    descripcion: vine.string().trim().maxLength(40).optional(),
    precio: vine.number().positive().withoutDecimals().optional(),
    categoria_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('categorias').where('id', value).first()
        return !!row
      })
      .optional(),
    unidad_medida_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('unidad_medidas').where('id', value).first()
        return !!row
      })
      .optional(),
    disponible: vine.boolean().optional(),
  })
)
