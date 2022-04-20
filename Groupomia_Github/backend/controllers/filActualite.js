const PostUtilisateur = require ('../models/PostUtilisateur');
const Commentaire = require ('../models/Commentaire');
const fs = require('fs');


exports.identificationOK = (req, res, next) => {
    res.status(201).json({ token: 'true'});
};


exports.supprimerPost = (req, res, next) => {
    
    let posteASupprimer = req.body.postutilisateur_id ;
    let infoPost = req.body ;

    if (infoPost.postutilisateur_imageok){
        //supprime l'image
            //Sauce.findOne({ _id: req.params.id })
            //.then(sauce => {
        const filename = infoPost.postutilisateur_urlimage.split ('/visuels/')[1];
        fs.unlink (`visuels/${filename}`, ()=>{});
            //})
            //.catch(error => res.status(500).json({ error }));
    }

    PostUtilisateur.destroy({
        where: {postutilisateur_id: posteASupprimer}
    });

    Commentaire.destroy({
        where: {commentaire_postreference: posteASupprimer}
    });

       //.then(() => {
        res.status(204).json({ message: 'Post supprimé !'});
       
      
};



exports.supprimerCommentaire = (req, res, next) => {
    
        let posteASupprimer = req.body.commentaire_id ;
    
        Commentaire.destroy({
            where: {commentaire_id:posteASupprimer}
           });
           //.then(() => {
            res.status(204).json({ message: 'Commentaire supprimé !'});
           
          
};

exports.savePostAvecImage = (req, res, next) => {
    //console.log('body filActualite', req.body);
    //console.log('body filename', req.file.filename);
    
        let body = {
            
            postutilisateur_urlimage:`${req.protocol}://${req.get('host')}/visuels/${req.file.filename}` ,
            postutilisateur_idcreateur: req.body.postutilisateur_idcreateur ,
            postutilisateur_texte : req.body.postutilisateur_texte,
            postutilisateur_mailcreateur:req.body.postutilisateur_mailcreateur,
            postutilisateur_imageok:true
        };
    
        PostUtilisateur.create({...body})
        .then(() =>{ 
            res.status(201).json({ message: 'Post avec image créé !'})
        })
        .catch (error => res.status(400).json ({ error }));
};


exports.savePostSansImage = (req, res, next) => {
    
    
        let body = {
            postutilisateur_idcreateur: req.body.postutilisateur_idcreateur ,
            postutilisateur_texte : req.body.postutilisateur_texte,
            postutilisateur_mailcreateur:req.body.postutilisateur_mailcreateur,
            postutilisateur_imageok:false,
            
        };
    
    PostUtilisateur.create({...body})
        .then(() =>{ 
            res.status(201).json({ message: 'Post créé !'})
        })
        .catch (error => res.status(400).json ({ error }));
        
};

exports.saveCommentaire = (req, res, next) => {
    
    
    let body = {
        commentaire_postreference: req.body.commentaire_postreference ,
        commentaire_idcreateur : req.body.commentaire_idcreateur,
        commentaire_texte:req.body.commentaire_texte,
        commentaire_emailcreateur:req.body.commentaire_emailcreateur,
        
    };

    Commentaire.create({...body})
    .then(() =>{ 
        res.status(201).json({ message: 'Commentaire créé !'})
    })
    .catch (error => res.status(400).json ({ error }));
    
};





exports.listeDesCommentaire = (req, res, next) => {
    
    const body = req.body;


    Commentaire.findAll({
        where: {commentaire_postreference: body.commentaire_postreference} 
    })
    .then((tousLesCommentaireDUnPoste) =>{ 
        res.status(200).json(tousLesCommentaireDUnPoste)
    })
    .catch (error => res.status(400).json ({ error }));

};



exports.listeDesPost = (req, res, next) => {
    
    const body = req.body;


    PostUtilisateur.findAll({ })
    .then((tousLesPost) =>{ 
        res.status(200).json(tousLesPost)
    })
    .catch (error => res.status(400).json ({ error }));

        
       
};




