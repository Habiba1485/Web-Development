let students = require("../data/students");
let calculateAverage = require("./calculateAverage");

function filterPassed() {

    return students.filter(student => {

        return calculateAverage(student.grades) >= 60;

    });
}

module.exports = filterPassed;