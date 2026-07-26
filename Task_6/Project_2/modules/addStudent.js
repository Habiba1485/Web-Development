let students = require("../data/students");

function addStudent(name, grades) {

    students.push({
        name,
        grades
    });

    console.log(`${name} added.`);
}

module.exports = addStudent;