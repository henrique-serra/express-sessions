const express = require('express');
const pool = require('./db/pool');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'session'
})

app.use(session({
    secret: process.env.APP_COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1min * 1000ms/1 sec)
}));

app.get('/', (req, res) => {
    
    if (req.session.viewCount) {
        req.session.viewCount++;
    } else {
        req.session.viewCount = 1;
    }

    res.send(`<h1>You have visited this page ${req.session.viewCount} times.</h1>`);
});

app.listen(process.env.PORT);