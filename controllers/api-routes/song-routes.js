const router = require('express').Router();
const {Song, Project, Comment} = require('../../models');


// All songs
router.get('/', (req, res) => {
    Song.findAll({
        })
        .then(dbSongData=> res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//one song
router.get('/:id', (req, res) => {
    Song.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Project,
                attributes: ['id', 'name']
            },
        ]
    })
    .then(dbSongData=> res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//create song
router.post('/', (req, res) => {
    Song.create({
            title: req.body.title,
            description: req.body.description,
            project_id: req.body.project_id,
            song_url: req.body.song_url
        })
        .then(dbSongData=> res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })


module.exports= router
