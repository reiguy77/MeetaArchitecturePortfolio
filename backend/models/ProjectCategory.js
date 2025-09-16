const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectCategory = sequelize.define('ProjectCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'project_categories',
  timestamps: true
});

module.exports = ProjectCategory;
