import vine from '@vinejs/vine'

export const inventarioValidator = vine.compile(
  vine.object({
    codigo: vine.number().positive().withoutDecimals(),
    nombre_producto: vine.string().trim().minLength(3).maxLength(100),
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
        const row = await db.from('unidades_medida').where('id', value).first()
        return !!row
      }),
    stock: vine.number().positive().withoutDecimals(),
    min_stock: vine.number().positive().withoutDecimals(),
  })
)

export const partialInventarioValidator = vine.compile(
  vine.object({
    codigo: vine.number().positive().withoutDecimals().optional(),
    nombre_producto: vine.string().trim().minLength(3).maxLength(100).optional(),
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
        const row = await db.from('unidades_medida').where('id', value).first()
        return !!row
      })
      .optional(),
    stock: vine.number().min(0).optional(),
    min_stock: vine.number().min(0).optional(),
  })
)
