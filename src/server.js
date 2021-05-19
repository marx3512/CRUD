const express = require('express');
const path = require('path')
const cors = require('cors')
const pages = require('./pages')
const server = express();


server
    .use(express.urlencoded({ extended: true}))
    .use(express.static('styles'))
    .use(cors())

    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    .get('/', pages.index)
    .get('/Register', pages.register)
    .get('/ShowUsers', pages.showUsers)
    .get('/DeleteUsers', pages.deleteUsers)
    .get('/TakeStudents', pages.takeStudents)
    .post('/Save-student', pages.saveStudent)
    .post('/Delete-student', pages.deleteStudent)

    .get('*', pages.erroPage)

server.listen(5500)