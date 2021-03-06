const router = require('express').Router();
const { Song } = require('../models');

router.get('/', (req, res) => {
    const data = { 
        loggedIn: req.session.loggedIn
    };

    if (req.query.error) {
        data.error = req.query.error;
    }

    res.render('homepage', data);
})

//All songs in a project
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

module.exports = router;