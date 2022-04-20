const DataTypes = require('sequelize');
  
const dataBase = require('../db/database');

  

const PostUtilisateur = dataBase.define('postutilisateur', {
 
    postutilisateur_id:{
  
        type:DataTypes.INTEGER.UNSIGNED,
  
        autoIncrement:true,
  
        allowNull:false,
  
        primaryKey:true,
    },

    postutilisateur_mailcreateur : { type: DataTypes.STRING, allowNull:false },
  
    postutilisateur_idcreateur: { type: DataTypes.INTEGER, allowNull:false } ,
  
    postutilisateur_texte: { type: DataTypes.STRING },

    postutilisateur_imageok: {type: DataTypes.BOOLEAN},

    postutilisateur_urlimage: {type: DataTypes.STRING, defaultValue: ""}

    
  
});

module.exports = PostUtilisateur;