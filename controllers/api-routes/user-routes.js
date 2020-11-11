const router = require('express').Router();
const {User, Project, Comment} = require('../../models');


// All users
router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Logout user
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
    else {
        res.status(404).end();
    }
});

// One user
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Project,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text'],
                    include: {
                      model: Project,
                      attributes: ['name']
                    }
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create user
router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;
          
              res.redirect('/projects');
        });
    });
});

// Login user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.redirect('/?error=' + encodeURIComponent('That username does not exist.'));
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.redirect('/?error=' + encodeURIComponent('Invalid password!'));
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.redirect('/projects');
        });
    });
});

module.exports = router;