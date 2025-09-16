const sequelize = require('../config/database');
const ProjectCategory = require('./ProjectCategory');
const Project = require('./Project');
const ProjectImage = require('./ProjectImage');
const Admin = require('./Admin');
const SiteContent = require('./SiteContent');

// Define associations
ProjectCategory.hasMany(Project, { foreignKey: 'categoryId', as: 'projects' });
Project.belongsTo(ProjectCategory, { foreignKey: 'categoryId', as: 'category' });

Project.hasMany(ProjectImage, { foreignKey: 'projectId', as: 'images' });
ProjectImage.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
  sequelize,
  ProjectCategory,
  Project,
  ProjectImage,
  Admin,
  SiteContent
};
