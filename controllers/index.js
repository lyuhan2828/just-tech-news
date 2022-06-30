// Much like the API folder's index.js file that collects the endpoints and prefixes them, here we are collecting the packaged group of API endpoints and prefixing them with the path /api.

// The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.

const router = require('express').Router();
const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;