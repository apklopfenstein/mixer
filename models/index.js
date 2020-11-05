const User = require('./User');
const Project = require('./Project');
const Song = require('./Song');
const Comment = require('./Comment');

User.hasMany(Project, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Project.hasMany(Comment, {
    foreignKey: 'project_id'
});

Project.hasMany(Song, {
    foreignKey: 'project_id'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Project, {
    foreignKey: 'project_id'
});

Song.belongsTo(Project, {
    foreignKey: 'project_id'
});

module.exports = { User, Project, Song, Comment };