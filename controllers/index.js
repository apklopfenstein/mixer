const router = require('express').Router();

const apiRoutes = require('./api-routes');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes.js');
const projectRoutes = require('./project-routes');

//designates url prefixes and routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/projects', projectRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;