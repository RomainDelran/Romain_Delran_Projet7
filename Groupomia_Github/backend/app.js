const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json());
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const path = require ('path');
const bodyParser  = require('body-parser');



const utilisateurRoutes = require ('./routes/utilisateur');
const postRoutes = require ('./routes/postUtilisateur');

// Import the sequelize object on which
// we have defined model.
const DataBase = require ('./db/database');

// Import the user model we have defined

//const User = require('./models/Utilisateur');
//const PostUtilisateur = require('./models/postUtilisateur');


DataBase.sync()
.then(console.log('connection a la bdd'))
.catch(error => console.log(error)) ;

//app.use(require('connect').bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/visuels', express.static(path.join(__dirname, '/visuels')));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    console.log('connexion api réussie !');
    next();
  });


  




app.use ( '/api/auth' ,utilisateurRoutes);
app.use ( '/api/post' ,postRoutes);



module.exports = app;