import vine from '@vinejs/vine'

export const proveedorValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(40),
    telefono: vine
      .string()
      .trim()
      .regex(/^\d{7,10}$/),
    correo: vine.string().trim().email(),
    direccion: vine.string().trim().minLength(5).maxLength(60),
  })
)

export const partialProveedorValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(25).optional(),
    telefono: vine
      .string()
      .trim()
      .regex(/^\d{7,10}$/)
      .optional(),
    correo: vine.string().trim().email().optional(),
    direccion: vine.string().trim().minLength(5).maxLength(60).optional(),
  })
)
