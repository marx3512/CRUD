const Database = require('sqlite-async');

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade TEXT,
            endereco TEXT,
            cpf TEXT,
            rg TEXT
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute);