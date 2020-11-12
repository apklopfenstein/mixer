const router = require('express').Router();
const { Project, User, Song } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all projects
router.get('/', (req, res) => {
    Project.findAll({
        attributes: [
            'id',
            'name'
        ]
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get single project
router.get('/:id', (req, res) => {
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
            }
        ]
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id' });
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a project
router.post('/', withAuth, (req, res) => {
    Project.create({
        name: req.body.name,
        user_id: req.session.user_id
    })
    .then(dbProjectData => res.redirect('/projects'))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;