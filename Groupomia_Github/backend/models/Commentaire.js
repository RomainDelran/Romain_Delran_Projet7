const DataTypes = require('sequelize');
  
const dataBase = require('../db/database');

  

const Commentaire = dataBase.define('commentaire', {
 
    commentaire_id:{
  
        type:DataTypes.INTEGER.UNSIGNED,
  
        autoIncrement:true,
  
        allowNull:false,
  
        primaryKey:true,
    },

    commentaire_postreference: { type: DataTypes.INTEGER, allowNull:false } ,
  
    commentaire_idcreateur: { type: DataTypes.INTEGER, allowNull:false } ,
  
    commentaire_texte: { type: DataTypes.STRING },

    commentaire_emailcreateur : { type: DataTypes.STRING },

    

    
  
});

module.exports = Commentaire;