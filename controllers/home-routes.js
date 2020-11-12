const router = require('express').Router();
const { Project, User, Comment, Song } = require('../models');

router.get('/', (req, res) => {
    const data = {};

    if (req.query.error) {
        data.error = req.query.error;
    }

    res.render('homepage', data);
})

router.get('/newsong', (req, res) => {
    res.render('newsong')
})

//all songs in a given project
router.get('/project-select', (req, res) => {
    Song.findAll({
        where: {
            project_id: 1
        }
    })
        .then(dbSongData => {
            const songs = dbSongData.map(song => song.get({
                plain: true
            }));
            res.render('project-select', {songs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})



// All projects
router.get('/projects', (req, res) => {
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
                model: Comment,
                attributes: ['id', 'comment_text', 'project_id', 'user_id'],
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
            const projects = dbProjectData.map(project => project.get({
                plain: true
            }));

            console.log(projects);

            res.render('projects', {
                projects,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// One project
router.get('/project/:id', (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'project_id', 'user_id'],
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
            if (!dbProjectData) {
                res.status(404).json({ message: 'No project found with this id ' });
                return;
            }

            const project = dbProjectData.get({ plain: true });

            res.render('single-project', {
                project,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;