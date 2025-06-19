import { BaseSeeder } from '@adonisjs/lucid/seeders'
import FacturaCompra from '#models/factura_compra'

export default class extends BaseSeeder {
  async run() {
    await FacturaCompra.createMany([
      {
        numeroFactura: 1001,
        nit: 900123456,
        nombreEmpresa: 'Empresa Uno S.A.S.',
        direccionEmpresa: 'Calle 10 #20-30',
      },
      {
        numeroFactura: 1002,
        nit: 900654321,
        nombreEmpresa: 'Empresa Dos S.A.S.',
        direccionEmpresa: 'Carrera 15 #40-50',
      },
      {
        numeroFactura: 1003,
        nit: 900789012,
        nombreEmpresa: 'Empresa Tres S.A.S.',
        direccionEmpresa: 'Avenida 5 #10-30',
      },
      {
        numeroFactura: 1004,
        nit: 900345678,
        nombreEmpresa: 'Empresa Cuatro S.A.S.',
        direccionEmpresa: 'Calle 25 #60-70',
      },
      {
        numeroFactura: 1005,
        nit: 900987654,
        nombreEmpresa: 'Empresa Cinco S.A.S.',
        direccionEmpresa: 'Carrera 30 #80-90',
      },
      {
        numeroFactura: 1006,
        nit: 900456789,
        nombreEmpresa: 'Empresa Seis S.A.S.',
        direccionEmpresa: 'Avenida 10 #20-40',
      },
      {
        numeroFactura: 1007,
        nit: 900321654,
        nombreEmpresa: 'Empresa Siete S.A.S.',
        direccionEmpresa: 'Calle 15 #30-50',
      },
      {
        numeroFactura: 1008,
        nit: 900654987,
        nombreEmpresa: 'Empresa Ocho S.A.S.',
        direccionEmpresa: 'Carrera 25 #40-60',
      },
      {
        numeroFactura: 1009,
        nit: 900789345,
        nombreEmpresa: 'Empresa Nueve S.A.S.',
        direccionEmpresa: 'Avenida 20 #50-70',
      },
      {
        numeroFactura: 1010,
        nit: 900123789,
        nombreEmpresa: 'Empresa Diez S.A.S.',
        direccionEmpresa: 'Calle 30 #60-80',
      },
    ])
  }
}
