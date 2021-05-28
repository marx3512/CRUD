const Database = require('../database/db');

class Del{
    constructor(body){
        this.body = body;
    }

    async delete(){
        const db = await Database;
        db.run(`DELETE FROM students WHERE id = ${this.body.campo}`);
        return;
    }
}

module.exports = Del;