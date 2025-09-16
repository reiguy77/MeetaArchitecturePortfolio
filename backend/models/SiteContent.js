const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SiteContent = sequelize.define('SiteContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'text' // 'text', 'image', 'json'
  }
});

module.exports = SiteContent;