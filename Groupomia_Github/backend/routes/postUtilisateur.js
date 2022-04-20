const express = require('express');
const router = express.Router();


const filActualite = require ('../controllers/filActualite');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');

 router.post ('/listeDesPost', auth ,filActualite.listeDesPost);
 //router.get ('/:id', auth ,sauceCtroller.retourSauce);
 router.post ('/savePostAvecImage',multer ,filActualite.savePostAvecImage);
 router.post ('/savePostSansImage', auth ,filActualite.savePostSansImage);
 router.post('/supprimerPost', auth ,filActualite.supprimerPost)
 //router.put ('/:id' , auth ,multer ,sauceCtroller.modifierSauce);
 //router.delete ('/supprimerPost', auth  ,filActualite.supprimerPost);
 router.post ('/identificationOK', auth ,filActualite.identificationOK);
 router.post ('/saveCommentaire', auth ,filActualite.saveCommentaire);
 router.post ('/listeDesCommentaire', auth ,filActualite.listeDesCommentaire);
 router.post('/supprimerCommentaire', auth ,filActualite.supprimerCommentaire)
 module.exports = router;