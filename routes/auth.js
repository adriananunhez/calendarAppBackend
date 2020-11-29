/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { fieldsValidators } = require('../middlewares/fields_validator');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new', 
    [ //middlewares, es una funcion que se ejecuta antes de algo
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El passwor debe tener minimo 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    crearUsuario);


router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El passwor debe tener minimo 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    loginUsuario );

router.get('/renew', validarJWT, revalidarToken );


module.exports = router;