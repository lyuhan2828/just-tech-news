const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3001;

// we're importing the connection to Sequelize from config/connection.js.
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// turn on connection to db and server

/* we use the sequelize.sync() method to establish the connection to the database. 
The "sync" part means that this is Sequelize taking the models 
and connecting them to associated database tables. If it doesn't find a table, it'll create it for you! */

/* use of {force: false} in the .sync() method. This doesn't have to be included, 
but if it were set to true, it would drop and re-create all of the database tables on startup. 
This is great for when we make changes to the Sequelize models, as the database would need a way to understand that something has changed. */


sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening port 3001'));
});