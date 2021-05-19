const Database = require('./database/db');
const saveStudentMethod = require('./database/saveStudent');
const deleteStudentMethod = require('./database/deleteStudent')

module.exports = {
    
    index(req,res){
        return res.sendFile(__dirname + '/views/index.html')
    },

    register(req,res){
        return res.sendFile(__dirname + '/views/register.html')
    },

    showUsers(req,res){
        return res.sendFile(__dirname + '/views/showUsers.html')
    },

    deleteUsers(req,res){
        return res.sendFile(__dirname + '/views/deleteUsers.html')
        
    },

    async takeStudents(req,res){
        try {
            const db = await Database
            const students = await db.all("SELECT * FROM students")
            console.log(students)
            return res.json(students)
        } catch (error) {
            console.log('Errrorrr')
            return res.send('Error no banco de dados')
        }
    },

    async saveStudent(req,res){
        const fields = req.body

        if(Object.values(fields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

        try {
            const db = await Database
            await saveStudentMethod(db,{
                nome: fields.nome,
                idade: fields.idade,
                endereco: fields.endereco,
                cpf: fields.cpf,
                rg: fields.rg,
            })
            
            //redirecionamento
            return res.redirect('/Register')
        } catch (error) {
            console.log(error)
            return res.send('Aconteceu um error no banco de dados')
        }
        
    },

    async deleteStudent(req,res){
        const fields = req.body
        if(Object.values(fields).includes('')){
            return res.send('Aconteceu um erro, tente novamente')
        }

        try {
            const db = await Database
            await deleteStudentMethod(db,{
                id: fields.id,
            })

            return res.redirect('/DeleteUsers')
        } catch (error) {
            console.log(error)
            return res.send('Ouvi um error no banco de dados')
        }
    },
    
    erroPage(req,res){
        return res.sendFile(__dirname + '/views/ErrorPage.html')
    }
}