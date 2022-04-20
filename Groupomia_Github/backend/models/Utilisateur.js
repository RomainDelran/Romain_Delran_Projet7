

const DataTypes = require('sequelize');
  
const dataBase = require('../db/database');

  

const User = dataBase.define('user', {
 
    user_id:{
  
        type:DataTypes.INTEGER.UNSIGNED,
  
        autoIncrement:true,
  
        allowNull:false,
  
        primaryKey:true,
    },
  
    email: { type: DataTypes.STRING, allowNull:false, unique: true } ,
  
    password: { type: DataTypes.STRING, allowNull:false },

    prenom: {type: DataTypes.STRING, defaultValue: "Prenom"},

    nom: {type: DataTypes.STRING, defaultValue: "Nom"},

    urlPhoto : {type: DataTypes.STRING, defaultValue: "http://localhost:8080/visuels/profile.jpg"},
  
});

module.exports = User;
