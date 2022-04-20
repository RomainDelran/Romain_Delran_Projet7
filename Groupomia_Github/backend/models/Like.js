const DataTypes = require('sequelize');
  
const dataBase = require('../db/database');

  

const Like = dataBase.define('like', {
 
    like_id:{
  
        type:DataTypes.INTEGER.UNSIGNED,
  
        autoIncrement:true,
  
        allowNull:false,
  
        primaryKey:true,
    },

    like_postreference: { type: DataTypes.INTEGER, allowNull:false } ,
  
    like_idliker: { type: DataTypes.INTEGER, allowNull:false } ,
  
    like_value: { type: DataTypes.INTEGER } 

    
  
});

module.exports = Like;