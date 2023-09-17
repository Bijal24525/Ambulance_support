// packages
const { DataTypes, Sequelize } = require('sequelize');

// database
const { sequelize } = require('../database');

const RouteInfo = sequelize.define('routeInfos', {
  
  did:{
    type: DataTypes.STRING(100),
    allowNull: true
  },  
  source: {
    type: DataTypes.STRING(100),
    allowNull: true 
  },
  destination: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  url:{
    type:DataTypes.STRING(500),
    allowNull: true
  }

});

module.exports = RouteInfo;
