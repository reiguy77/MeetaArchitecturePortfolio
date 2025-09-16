const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectImage = sequelize.define('ProjectImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    }
  }
}, {
  tableName: 'project_images',
  timestamps: true
});

module.exports = ProjectImage;
