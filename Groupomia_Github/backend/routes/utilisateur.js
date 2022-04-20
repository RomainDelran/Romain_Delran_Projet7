const express = require ('express');
const router = express.Router ();
const utilisateurController = require ('../controllers/utilisateur');
const auth = require ('../middleware/auth');

router.post ('/signup', utilisateurController.signup);
router.post ('/login', utilisateurController.login);

router.put ('/modifiOne', auth ,  utilisateurController.modifiOne);
router.post ('/getOne', auth ,  utilisateurController.getOne);
router.post ('/deleteOne', auth ,  utilisateurController.deleteOne);


module.exports = router;