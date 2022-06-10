// Much like the API folder's index.js file that collects the endpoints and prefixes them, here we are collecting the packaged group of API endpoints and prefixing them with the path /api.

// The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.

const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;