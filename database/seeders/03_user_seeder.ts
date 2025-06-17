import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    console.log('Insertando usuarios...')
    await User.createMany([
      {
        nombre: 'Diana',
        apellido: 'Amador',
        tipo_documento_id: 1,
        numero_documento: '1110552361',
        correo: 'diamarcelaleal23@gmail.com',
        password: '1234',
        numero_telefono: '3007489413',
        created_at: DateTime.now(),
      },
      {
        nombre: 'Valentina',
        apellido: 'Melo',
        tipo_documento_id: 1,
        numero_documento: '1000000',
        correo: 'valentinaelo02@gmail.com',
        password: '0000',
        numero_telefono: '3000000000',
        created_at: DateTime.now(),
      },
      {
        nombre: 'Diego',
        apellido: 'Camacho',
        tipo_documento_id: 1,
        numero_documento: '123456789',
        correo: 'diegoalejandroct1525@gmail.com',
        password: '0000',
        numero_telefono: '3001234567',
        created_at: DateTime.now(),
      },
      {
        nombre: 'Daniel',
        apellido: 'Ibague',
        tipo_documento_id: 2,
        numero_documento: '987654321',
        correo: 'xbrain081@gmail.com',
        password: '4567',
        numero_telefono: '3209876543',
        created_at: DateTime.now(),
      },
      {
        nombre: 'Laura',
        apellido: 'Zamora',
        tipo_documento_id: 3,
        numero_documento: '1122334455',
        correo: 'laurita_9505@hotmail.com',
        password: '8901',
        numero_telefono: '3101122334',
        created_at: DateTime.now(),
      },
      {
        nombre: 'Jonatan',
        apellido: 'Sanchez',
        tipo_documento_id: 1,
        numero_documento: '11111111',
        correo: 'jonatan25sanchez@gmail.com',
        password: '1234',
        numero_telefono: '3009999999',
        created_at: DateTime.now(),
      },
    ])
    console.log('Usuarios insertados')
  }
}
