let students = require("../data/students");
let calculateAverage = require("./calculateAverage");

function listStudents() {

    students.forEach(student => {

        console.log(
            `${student.name} | Average: ${calculateAverage(student.grades)}`
        );

    });

}

module.exports = listStudents;