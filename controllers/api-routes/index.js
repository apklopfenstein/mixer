const router = require('express').Router();

const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const commentRoutes = require('./comment-routes');
const songRoutes = require('./song-routes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/comments', commentRoutes);
router.use('/songs', songRoutes)

module.exports = router;