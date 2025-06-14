import type { HttpContext } from '@adonisjs/core/http'
import TipoDocumento from '#models/tipo_documento'

export default class TipoDocumentoController {
  public async list({ response }: HttpContext) {
    const documentos = await TipoDocumento.all()
    return response.ok(documentos)
  }
}
