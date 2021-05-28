const express = require('express');
const path = require('path')
const cors = require('cors')
const pages = require('./pages')
const server = express();
const session = require('express-session');
const flash = require('req-flash');


const sessionOptions = session({
    secret: 'asudhasudhuafhuasf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24 * 7,
        httpOnly: true
    }
});

server
    .use(express.urlencoded({ extended: true}))
    .use(express.static('styles'))
    .use(sessionOptions)
    .use(cors())
    .use(flash())

    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'ejs')
    .use((req,res,next) => {
        res.locals.errors = req.flash('errors');
        res.locals.success = req.flash('success');
        res.locals.fails = req.flash('fails');
        next();
    })

    .get('/', pages.index)
    .get('/Register', pages.register)
    .get('/ShowUsers', pages.showUsers)
    .get('/DeleteUsers', pages.deleteUsers)
    .get('/TakeStudents', pages.takeStudents)
    .get('/TakeStudent', pages.takeStudent)
    .post('/Save-student', pages.saveStudent)
    .get('/Delete-student/:campo', pages.deleteStudent)

    .get('*', pages.erroPage)

server.listen(5500)
