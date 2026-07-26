const addStudent = require("./modules/addStudent");
const listStudents = require("./modules/listStudents");
const filterPassed = require("./modules/filterPassed");

addStudent("Ali", [90, 80, 95]);

addStudent("Sara", [70, 60, 75]);

addStudent("Omar", [30, 50, 40]);

console.log("\nAll Students:");

listStudents();

console.log("\nPassed Students:");

const passed = filterPassed();

passed.forEach(student => {
    console.log(student.name);
});