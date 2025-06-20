import vine from '@vinejs/vine'

export const createUserRoleValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(2).maxLength(20),
    apellido: vine.string().trim().minLength(2).maxLength(20),
    tipo_documento_id: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const result = await db.from('tipos_documentos').where('id', value).first()
        return !!result
      }),
    numero_documento: vine.string().trim().minLength(6).maxLength(10),
    correo: vine.string().trim().email(),
    password: vine
      .string()
      .trim()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
    numero_telefono: vine.string().trim().minLength(7).maxLength(10),
    role_ids: vine
      .array(
        vine.number().positive().exists(async (db, value) => {
          const result = await db.from('roles').where('id', value).first()
          return !!result
        })
      )
      .minLength(1),
  })
)

export const updateUserRoleValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(2).maxLength(20),
    apellido: vine.string().trim().minLength(2).maxLength(20),
    tipo_documento_id: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const result = await db.from('tipos_documentos').where('id', value).first()
        return !!result
      }),
    numero_documento: vine.string().trim().minLength(6).maxLength(10),
    correo: vine.string().trim().email(),
    numero_telefono: vine.string().trim().minLength(7).maxLength(20),
    role_ids: vine
      .array(
        vine.number()
          .positive()
          .exists(async (db, value) => {
          const result = await db.from('roles').where('id', value).first()
          return !!result
        })
      )
      .minLength(1),
  })
)
