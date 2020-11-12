const router = require('express').Router();
const { Song, Project, Comment } = require('../../models');
const S3 = require('aws-sdk/clients/s3');


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
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//create song
router.post('/', (req, res) => {    
    const s3 = new S3();
    const params = {
        ACL: 'public-read',
        Bucket: 'mixer-storage', 
        Key: process.env.AWS_SECRET_ACCESS_KEY, 
        Body: req.files.song.data
    };
    s3.upload(params, function(err, data) {
        console.log(req);
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

//delete song
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
