import vine from '@vinejs/vine'

export const recepcionValidator = vine.compile(
  vine.object({
    producto_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('productos').where('id', value).first()
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
    cantidad: vine.number().positive(),
    observacion: vine.string().trim().nullable().optional(),
  })
)

export const partialRecepcionValidator = vine.compile(
  vine.object({
    producto_id: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const row = await db.from('productos').where('id', value).first()
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
    cantidad: vine.number().positive().optional(),
    observacion: vine.string().trim().nullable().optional(),
  })
)
