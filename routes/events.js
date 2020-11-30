/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { isDate } = require('../helpers/isDate');
const { getEventos, crearEnvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { fieldsValidators } = require('../middlewares/fields_validator');
const { validarJWT } = require('../middlewares/validar-jwt');


//Todas tienen que pasar por la validadcion del JWT
router.use( validarJWT );

//Get events
router.get(
    '/',
    getEventos
);

// Create new event
router.post(
    '/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha es obligatoria').custom( isDate ),
        check('end','La fecha es obligatoria').custom( isDate ),
        fieldsValidators
    ],
    crearEnvento 
);

//Update event
router.put(
        '/:id', 
        [
            check('title','El titulo es obligatorio').not().isEmpty(),
            check('start','La fecha es obligatoria').custom( isDate ),
            check('end','La fecha es obligatoria').custom( isDate ),
            fieldsValidators
        ],
        actualizarEvento );

//Delete event
router.delete('/:id', eliminarEvento );

module.exports = router;