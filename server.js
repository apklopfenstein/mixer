const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// const path = require('path');
// const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3001;

//handlebars setup
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//end handlebars setup

//session setup
const session = require('express-session');
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
//end session setup

//make styles and html available to server
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialized());
// app.use(passport.session());

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});