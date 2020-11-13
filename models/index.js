const User = require('./User');
const Project = require('./Project');
const Song = require('./Song');

User.hasMany(Project, {
    foreignKey: 'user_id'
});

Project.hasMany(Song, {
    foreignKey: 'project_id'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Song.belongsTo(Project, {
    foreignKey: 'project_id'
});

module.exports = { User, Project, Song };