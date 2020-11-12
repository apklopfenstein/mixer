const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Project, User } = require('../models');

// Get all projects
router.get('/', withAuth, (req, res) => {
    Project.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'name'
        ],
        include: [
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
  
router.get('/create-project', withAuth, (req, res) => {
    res.render('create-project', {loggedIn: req.session.loggedIn});
});

module.exports = router;