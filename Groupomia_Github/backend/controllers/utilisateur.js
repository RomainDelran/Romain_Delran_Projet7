const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const Utilisateur = require ('../models/Utilisateur');



exports.signup = (req, res, next) => {
    
        bcrypt.hash (req.body.password, 10)
        .then(hash => {
            const body = {
                email: req.body.email ,
                password : hash
            };


            Utilisateur.create({...body})
                .then(() =>{ 
                    res.status(201).json({ message: 'utilisateur créé !'})
                })
                .catch (error => res.status(400).json ({ error }));
        })
       .catch(error=> res.status(500).json(error));
};





exports.login = (req, res , next) => {
    
    Utilisateur.findOne ({where:{email : req.body.email}})
        .then(utilisateur => {
            
            if (!utilisateur){
                return res.status(401).json({ error : 'Utilisateur non trouvé'})
            };
            bcrypt.compare(req.body.password , utilisateur.password)
                .then(valid => {
                    
                    if (!valid) {
                        return res.status(401).json({error: 'mot de passe incorect'})
                    };
                    res.status(200).json ({
                        user_id: utilisateur.user_id,
                        token: jwt.sign(
                            { user_id : utilisateur.user_id },
                            'RAMDOM_TOKEN_SECRET'
                        )
                    });
                })
                .catch(error => res.status(500).json ({ error }));
        })
        .catch(error => res.status(500).json ({ error }));
};







exports.getOne = (req, res , next) => {
    const id= req.body.user_id;
    
    Utilisateur.findOne ({where:{user_id : id}})
        .then(utilisateur => {
            if(utilisateur==null) return res.status(404).json ({msg: "Not found"});
            
            res.status(200).json(utilisateur);
        })
        .catch(error => res.status(500).json ({ error }));
};

exports.modifiOne = (req, res , next) => {
    const id = req.body.user_id;
    const body = req.body;
    
    Utilisateur.findOne ({where:{user_id : id}})
        .then(utilisateur => {
            
            if(utilisateur==null){ return res.status(404).json ({msg: "Not found test"})};
            if(body.email != ""){
            utilisateur.email = body.email ;
            };
            if(body.prenom != ""){
                utilisateur.prenom = body.prenom ;
            };
            if(body.nom != ""){
                utilisateur.nom = body.nom ;
            };
            if(body.urlPhoto != ""){
                utilisateur.urlPhoto = body.urlPhoto ;
            };
            
            
            utilisateur.save ()
                .then(() => res.status(201).json({msg : "update ressource"}))
                .catch(error => res.status(500).json ({ error }));
                //res.status(200).json(utilisateur);
            })
        .catch(error => res.status(500).json ({  error }));
    
};


exports.deleteOne = (req, res , next) => {
    const id = req.body.user_id;
    Utilisateur.destroy ({where:{user_id : id}})

        .then(utilisateur => {
            if(!utilisateur) return res.status(404).json ({msg: "Not found"});
            res.status(200).json ({msg : "utilisateur detruit"});
            })
        .catch(error => res.status(500).json ({ error }));
};