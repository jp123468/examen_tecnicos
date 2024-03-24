import {Router} from 'express'
import {
    login,
    registro,
    listarUsuarios,
    detalleUsuarios,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    nuevoPassword,
} from "../controllers/usuarios_controllers.js";


const router = Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Login y Registro Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 nombre:
 *                   type: string
 *                   example: Nombre Ejemplo
 *                 apellido:
 *                   type: string
 *                   example: Apellido Ejemplo
 *                 email:
 *                   type: string
 *                   example: test123@hotmail.com
 */
router.post('/login',login)

/**
 * @openapi
 * /api/registro:
 *   post:
 *     tags:
 *       - Login y Registro Usuarios
 *     summary: Registro de nuevo usuario
 *     description: Crea un nuevo usuario con correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julio
 *               apellido:
 *                 type : string
 *                 example: Julio 
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *               password:
 *                 type: string
 *                 example: contraseña

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuario registrado exitosamente.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type : string
 *                           example: Julio 
 */

router.post('/registro',registro)

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuarios.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         id:
 *                           type: string
 *                           example: s45l5oi10A
 */

router.get('/usuarios',listarUsuarios)

/**
 * @openapi
 * /api/recuperar-password:
 *   post:
 *     tags:
 *       - Recuperar Contraseña Usuarios
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: julio@hotmail.com
 

 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Contraseña recuperada exitosamente
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.post('/recuperar-password',recuperarPassword)


/**
 * @openapi
 * /api/nuevo-password:
 *   post:
 *     tags:
 *       - Nueva Contraseña Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: contraseña
 *               confirm-password:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ya puede iniciar sesión.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.post('/nuevo-password',nuevoPassword)



/**
 * @openapi
 * /api/usuario/actualizarpassword:
 *   put:
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *               new_password:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: string
 *                       example: Password updated successfully.
 */


router.put('/usuario/actualizarpassword',actualizarPassword)

/**
 * @openapi
 * /api/usuario/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     Usuario:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Juan 
 *                         apellido:
 *                           type: string
 *                           example: Pérez
 *                         email:
 *                           type: string
 *                           example: juan@example.com
 */

router.get('/usuario/:id',detalleUsuarios)
/**
 * @openapi
 * /api/usuario/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julio
 *               apellido:
 *                 type: string
 *                 example: Ríos
 *               direccion:
 *                 type: string
 *                 example: Enrique Segoviano
 *               telefono:
 *                 type: string
 *                 example: 0056163585
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del Usuario a actualizar.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Perfil actualizado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         direccion:
 *                           type: string
 *                           example: Enrique Segoviano
 *                         telefono:
 *                           type: string
 *                           example: 0056163585
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 */



router.put('/usuario/:id',actualizarPerfil)



export default router




