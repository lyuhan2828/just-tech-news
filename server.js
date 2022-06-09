const express = require('express');
// The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.
const routes = require('./routes');
// we're importing the connection to Sequelize from config/connection.js.
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server

/* we use the sequelize.sync() method to establish the connection to the database. 
The "sync" part means that this is Sequelize taking the models 
and connecting them to associated database tables. If it doesn't find a table, it'll create it for you! */

/* use of {force: false} in the .sync() method. This doesn't have to be included, 
but if it were set to true, it would drop and re-create all of the database tables on startup. 
This is great for when we make changes to the Sequelize models, as the database would need a way to understand that something has changed. */


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening port 3001'));
});