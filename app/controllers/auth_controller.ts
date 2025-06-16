import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import PasswordReset from '#models/password_reset'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
// import mail from '@adonisjs/mail/services/main' // Descomenta si vas a enviar correos

export default class AuthController {
  // LOGIN
  async login({ request }: HttpContext) {
    const { correo, password } = request.only(['correo', 'password'])
    const user = await User.verifyCredentials(correo, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  // CAMBIO DE CONTRASEÑA AUTENTICADO
  async cambiarPassword({ request, response }: HttpContext) {
    const { correo, actual, nueva } = request.only(['correo', 'actual', 'nueva'])

    const user = await User.findBy('correo', correo)

    if (!user) {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }

    const valid = await user.verifyPassword(actual)

    if (!valid) {
      return response.status(400).json({ message: 'Contraseña actual incorrecta' })
    }

    user.password = nueva
    await user.save()

    return { message: 'Contraseña actualizada correctamente' }
  }

  // SOLICITAR RECUPERACIÓN
  async solicitarReset({ request, response }: HttpContext) {
    const { correo } = request.only(['correo'])
    const user = await User.findBy('correo', correo)

    if (!user) {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }

    const token = randomUUID()

    await PasswordReset.create({
      correo,
      token,
    })

    const frontendLink = `http://localhost:5173/reset/${token}`

    // Si luego configuras correo real, puedes usar esta URL también
    // await mail.send(...)

   return {
      message: 'Redireccionando al enlace de recuperación',
      enlace: `http://localhost:5173/reset/${token}`, // este es el bueno
      token,
    }
  }

  // CONFIRMAR NUEVA CONTRASEÑA
  async confirmarReset({ request, response }: HttpContext) {
    const { token, nueva } = request.only(['token', 'nueva'])

    const resetRecord = await PasswordReset.findBy('token', token)

    if (!resetRecord) {
      return response.status(400).json({ message: 'Token inválido' })
    }

    const now = DateTime.now()
    const createdAt = resetRecord.created_at

    if (now.diff(createdAt, 'hours').hours > 1) {
      await resetRecord.delete()
      return response.status(400).json({ message: 'El token ha expirado' })
    }

    const user = await User.findBy('correo', resetRecord.correo)

    if (!user) {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.password = nueva
    await user.save()
    await resetRecord.delete()

    return { message: 'Contraseña restablecida correctamente' }
  }
}
