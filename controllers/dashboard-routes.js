const router = require('express').Router();
const { Project, User, Comment } = require('../models');

// Get all projects
router.get('/', (req, res) => {
    Project.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'name',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbProjectData => {
          const projects = dbProjectData.map(project => project.get({ plain: true }));
          res.render('dashboard', { projects, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});
  
router.get('/create-project', (req, res) => {
    res.render('create-project', {loggedIn: req.session.loggedIn});
});
  
module.exports = router;