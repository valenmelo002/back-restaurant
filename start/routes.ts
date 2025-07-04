/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import FacturasCompraController from '#controllers/factura_compras_controller'
import FacturaCompraDetallesController from '#controllers/factura_compra_detalles_controller'
const RolesController = () => import('#controllers/roles_controller')
const IniciosController = () => import('#controllers/inicios_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const CategoriasController = () => import('#controllers/categorias_controller')
const UnidadMedidasController = () => import('#controllers/unidad_medidas_controller')
const AuthController = () => import('#controllers/auth_controller')
const InventoriesController = () => import('#controllers/inventarios_controller')
const ProductosController = () => import('#controllers/productos_controller')
const ProveedoresController = () => import('#controllers/proveedores_controller')
const RecepcionesController = () => import('#controllers/recepcions_controller')
const HistorialInventarioController = () => import('#controllers/historial_inventarios_controller')
const UsuariosController = () => import('#controllers/usuarios_controller')
const TipoDocumentoController = () => import('#controllers/tipo_documento_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/inicio', [DashboardController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('dashboard', [IniciosController, 'index'])

router.post('/login', [AuthController, 'login'])

router.post('/solicitar-reset', [AuthController, 'solicitarReset'])

router.post('/confirmar-reset', [AuthController, 'confirmarReset'])

router.get('/verificar-token/:token', [AuthController, 'verificarToken']) // esta es la nueva

router.post('/cambiar-password', [AuthController, 'cambiarPassword'])

router.get('/inventario', [InventoriesController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('/inventario/:id', [InventoriesController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.post('/inventario', [InventoriesController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.patch('/inventario/:id', [InventoriesController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('/inventario/:id', [InventoriesController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Rutas de Productos

router.get('/producto', [ProductosController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.post('/producto', [ProductosController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/producto/:id', [ProductosController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.patch('/producto/:id', [ProductosController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.delete('/producto/:id', [ProductosController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Ruta de categoria

router.get('/categoria', [CategoriasController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Ruta de Unidad de medida

router.get('/unidad-medida', [UnidadMedidasController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Ruta de proveedores
router.get('/proveedores', [ProveedoresController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.post('/proveedores', [ProveedoresController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('/proveedores/:id', [ProveedoresController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.patch('/proveedores/:id', [ProveedoresController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('/proveedores/:id', [ProveedoresController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

// Ruta de recepcion

// ruta de Historial de inventario
router.get('/recepcion', [RecepcionesController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.post('/recepcion', [RecepcionesController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/recepcion/:id', [RecepcionesController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.put('/recepcion/:id', [RecepcionesController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.patch('/recepcion/:id', [RecepcionesController, 'patch']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('/recepcion/:id', [RecepcionesController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/v1/facturasCompra', [FacturasCompraController, 'index']).use(
    middleware.auth({
    guards: ['api'],
  })
)
router.post('/api/v1/facturasCompra', [FacturasCompraController, 'store']).use(
    middleware.auth({
    guards: ['api'],
  })
)



router.get('/api/v1/facturasCompra/:id', [FacturasCompraController, 'show']).use(
  middleware.auth({
    guards: ['api'],
  })
)


router.put('/api/v1/facturasCompra/:id', [FacturasCompraController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('/api/v1/facturasCompra/:id', [FacturasCompraController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('/historial-inventario', [HistorialInventarioController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.post('/historial-inventario', [HistorialInventarioController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('/historial-inventario/:id', [HistorialInventarioController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.delete('/historial-inventario/:id', [HistorialInventarioController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)


// Rutas para los detalles de factura de compra
router.post('/api/v1/facturasCompra/detalles', [FacturaCompraDetallesController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
//Rutas de usuarios_roles
router.get('/user_roles', [UsuariosController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)

// Puedes agregar más rutas si necesitas listar, actualizar o eliminar detalles:
router.get('/api/v1/facturasCompra/detalles', [FacturaCompraDetallesController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.post('/user_roles', [UsuariosController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/v1/facturasCompra/detalles/:id', [FacturaCompraDetallesController, 'show']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/user_roles/:id', [UsuariosController, 'get']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.put('/api/v1/facturasCompra/detalles/:id', [FacturaCompraDetallesController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.patch('/user_roles/:id', [UsuariosController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.delete('/api/v1/facturasCompra/detalles/:id', [FacturaCompraDetallesController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.delete('/user_roles/:id', [UsuariosController, 'destroy']).use(
  middleware.auth({
    guards: ['api'],
  })
)

// Rutas de roles

router.get('/roles', [RolesController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Rutas de tipo_documento
router
  .get('/tipo_documentos', [TipoDocumentoController, 'list'])
  .use(middleware.auth({ guards: ['api'] }))
