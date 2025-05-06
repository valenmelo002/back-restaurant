/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import IniciosController from '#controllers/inicios_controller'
import router from '@adonisjs/core/services/router'
import DashboardController from '#controllers/dashboard_controller'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'
import InventoryController from '#controllers/inventories_controller'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/dashboard', [DashboardController, 'index'])
  .use(middleware.auth({
    guards: ['api']
  }))

router.get('inicio', [IniciosController, 'index'])

router.post('/login', [AuthController, 'login'])

router.post('/inventario', [InventoryController, 'create'])
router.get('/inventario', [InventoryController, 'index'])
router.get('/inventario/:id', [InventoryController, 'show'])
router.put('/inventario/:id', [InventoryController, 'update'])
router.delete('/inventario/:id', [InventoryController, 'destroy'])