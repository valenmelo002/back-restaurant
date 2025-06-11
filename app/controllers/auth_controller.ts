import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { correo, password } = request.only(['correo', 'password'])
    const user = await User.verifyCredentials(correo, password)
    const token = await User.accessTokens.create(user)
    return token
  }

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
}
