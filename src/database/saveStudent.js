function saveStudent(db, student) {
    return db.run(`
        INSERT INTO students (
            nome,
            idade,
            endereco,
            cpf,
            rg
        ) VALUES (
            "${student.nome}",
            "${student.idade}",
            "${student.endereco}",
            "${student.cpf}",
            "${student.rg}"
        );
`)
}


module.exports = saveStudent;