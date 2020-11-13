const router = require('express').Router();
const { Project, User, Song } = require('../models');

// All projects
router.get('/', (req, res) => {
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

// One project
router.get('/:id', (req, res) => {
    console.log(req.params);

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
                model: User,
                attributes: ['username']
            },
            {
                model: Song
            }
        ]
    })
    .then(dbProjectData => {
        if(!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id '});
            return;
        }

        const project = dbProjectData.get({ plain: true });

        res.render('project-select', {
            project,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id/new-song', (req, res) => {
    res.render('newsong', { projectId: req.params.id });
});

module.exports = router;