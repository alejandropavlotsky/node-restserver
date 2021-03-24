const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/user');
const {
  esRolValido,
  mailExist,
  existUserById,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    check('password', 'El password es obligatorio y más de 6 letras').isLength({
      min: 6,
    }),

    // check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(mailExist),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
