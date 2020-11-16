const router = require('express').Router();
const { Song, Project } = require('../../models');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuid } = require('uuid');

// All songs
router.get('/', (req, res) => {
    Song.findAll({
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// One song
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
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Create song
router.post('/', (req, res) => {
    const s3 = new S3();
    const params = {
        ACL: 'public-read',
        Bucket: 'mixer-storage', 
        Key: uuid(),
        Body: req.files.song.data
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }

        Song.create({
            title: req.body.title,
            description: req.body.description,
            project_id: req.body.projectId,
            song_url: data.Location,
            s3_object_key: data.Key
        })
            .then(dbSongData => res.redirect('/projects/' + req.body.projectId))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
})

// Delete song
router.delete('/:id', (req, res) => {
    Song.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

module.exports = router