function deleteStudent(db,student){
    return db.run(
        `DELETE FROM students WHERE id = ${student.id}`
    )
}

module.exports = deleteStudent;