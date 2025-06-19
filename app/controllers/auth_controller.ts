import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import PasswordReset from '#models/password_reset'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default class AuthController {
  // LOGIN
  async login({ request }: HttpContext) {
    const { correo, password } = request.only(['correo', 'password'])
    const user = await User.verifyCredentials(correo, password)
    const token = await User.accessTokens.create(user)

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
      },
    }
  }

  // CAMBIO DE CONTRASEÑA (AUTENTICADO)
  async cambiarPassword({ request, response }: HttpContext) {
    const { correo, actual, nueva } = request.only(['correo', 'actual', 'nueva'])

    const user = await User.findBy('correo', correo)
    if (!user) return response.status(404).json({ message: 'Usuario no encontrado' })

    const valid = await user.verifyPassword(actual)
    if (!valid) return response.status(400).json({ message: 'Contraseña actual incorrecta' })

    user.password = nueva
    await user.save()

    return { message: 'Contraseña actualizada correctamente' }
  }

  // SOLICITAR RESET
  async solicitarReset({ request, response }: HttpContext) {
    const { correo } = request.only(['correo'])
    const user = await User.findBy('correo', correo)

    if (!user) return response.status(404).json({ message: 'Usuario no encontrado' })

    const token = randomUUID()
    const expiresAt = DateTime.now().plus({ hours: 1 })
    const frontendLink = `http://localhost:5173/reset/${token}`

    await PasswordReset.create({
      correo,
      token,
      expires_at: expiresAt,
      used: false,
    })

    // Email template
    const htmlPath = join(process.cwd(), 'resources/emails/reset_password.html')
    const rawHtml = readFileSync(htmlPath, 'utf8')
    const html = rawHtml
      .replace(/{{nombre}}/g, user.nombre || user.correo)
      .replace(/{{url}}/g, frontendLink)

    await mail.send((message) => {
      message
        .from('tu_correo@gmail.com')
        .to(user.correo)
        .subject('Restablecer contraseña')
        .html(html)
    })

    return {
      message: 'Correo de recuperación enviado con éxito',
      enlace: frontendLink,
    }
  }

  // VERIFICAR TOKEN (para redirigir si ya fue usado o expiró)
  async verificarToken({ params, response }: HttpContext) {
    const { token } = params
    const reset = await PasswordReset.findBy('token', token)

    if (!reset) {
      return response.status(400).json({ message: 'Token no válido' })
    }

    const isExpired = reset.expires_at < DateTime.now()
    const isUsed = reset.used

    if (isExpired) {
      return response.status(400).json({ message: 'El token ha expirado' })
    }

    if (isUsed) {
      return response.status(400).json({ message: 'El token ya ha sido utilizado' })
    }

    return { message: 'Token válido' }
  }

  // CONFIRMAR NUEVA CONTRASEÑA
  async confirmarReset({ request, response }: HttpContext) {
    const { token, nueva } = request.only(['token', 'nueva'])
    const reset = await PasswordReset.findBy('token', token)

    if (!reset) {
      return response.status(400).json({ message: 'Token inválido' })
    }

    if (reset.used) {
      return response.status(400).json({ message: 'El token ya ha sido utilizado' })
    }

    if (reset.expires_at < DateTime.now()) {
      return response.status(400).json({ message: 'El token ha expirado' })
    }

    const user = await User.findBy('correo', reset.correo)
    if (!user) {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.password = nueva
    await user.save()

    reset.used = true
    await reset.save()

    return { message: 'Contraseña restablecida correctamente' }
  }
}
