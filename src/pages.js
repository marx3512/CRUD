const Database = require('./database/db');
const ModelSaveStudent = require('./model/SaveStudentModel');
const ModelShowStudents = require('./model/showStudentModel');
const ModelShowOnlyStudent = require('./model/ShowOnlyOneStudent');
const ModelDeleteStudent = require('./model/DeleteStudentModel');

module.exports = {
    
    index(req,res){
        return res.render('index');
    },

    register(req,res){
        return res.render('register');
    },

    showUsers(req,res){
        const allStudents = [];
        return res.render('showUsers', { allStudents });
    },

    deleteUsers(req,res){
        const student = [];
        return res.render('deleteUsers', { student });
    },

    async takeStudents(req,res){
        try {
            const fields = new ModelShowStudents(req.query);
            await fields.show();
            
            if(fields.errors.length > 0){
                req.flash('errors', fields.errors);
                return res.redirect('back');
            }
            
            const allStudents = await fields.show();
            
            if(allStudents.length == 0){
                req.flash('fails', 'Não foi encontrado nenhum estudante com esse dado inserido');
                return res.redirect('back');
            }
            
            return res.render('showUsers', { allStudents });
        } catch (error) {
            console.log(error)
            return res.send('Error no banco de dados')
        }
    },

    async takeStudent(req,res){
        try {
            const fields = new ModelShowOnlyStudent(req.query);
            const student = await fields.show();

            if(fields.errors.length > 0){
                req.flash('errors', fields.errors);
                return res.redirect('back');
            }

            if(student.length == 0){
                req.flash('fails', 'Não foi encontrado nenhum estudante com esse dado inserido');
                return res.redirect('back');
            }

            return res.render('deleteUsers', { student });
        } catch (error) {
            console.log(error)
            return res.send('Error no banco de dados')
        }
    },

    async saveStudent(req,res){
        try {
            const db = await Database;
            const allStudents = await db.all("SELECT * FROM students");
            const fields = new ModelSaveStudent(req.body);
            await fields.register(allStudents);

            if(fields.errors.length > 0){
                req.flash('errors', fields.errors);
                return res.redirect('back');
            }
            req.flash('success', 'Seu aluno foi cadastrado com sucesso');
            return res.redirect('back');
        } catch (error) {
            console.log(error)
            return res.send('Aconteceu um error no banco de dados')
        }
        
    },

    async deleteStudent(req,res){
        try {
            const fields = new ModelDeleteStudent(req.params);
            await fields.delete();
            req.flash('success', 'Seu aluno foi deletado com sucesso');
            return res.redirect('/DeleteUsers');
        } catch (error) {
            console.log(error);
            return res.send('Aconteceu um error no banco de dados')
        }
    },
    
    erroPage(req,res){
        return res.render('ErrorPage');
    }
}