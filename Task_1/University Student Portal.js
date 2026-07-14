let studentName = prompt("Enter student name:");
let attendance = Number(prompt("Enter attendance percentage:"));
let midtermScore = Number(prompt("Enter midterm score:"));
let finalExamScore = Number(prompt("Enter final exam score:"));
let assignmentScore = Number(prompt("Enter assignment score:"));
let tuitionStatus = prompt("Has the tuition been paid? (Yes/No)");

// Check tuition payment status
if (tuitionStatus.toLowerCase() !== "yes") {
    console.log("Results cannot be viewed because tuition has not been paid.");
}
else {

    // Check attendance requirement
    if (attendance < 75) {
        console.log("Student Name: " + studentName);
        console.log("Attendance: " + attendance + "%");
        console.log("Academic Status: FAIL");
        console.log("Reason: Attendance is below the required 75%.");
    }
    else {

        // Calculate total score
        let totalScore = midtermScore + finalExamScore + assignmentScore;

        // Determine letter grade
        let letterGrade;

        if (totalScore >= 90) {
            letterGrade = "A";
        }
        else if (totalScore >= 80) {
            letterGrade = "B";
        }
        else if (totalScore >= 70) {
            letterGrade = "C";
        }
        else if (totalScore >= 60) {
            letterGrade = "D";
        }
        else {
            letterGrade = "F";
        }

        // Determine academic status
        let academicStatus;

        if (letterGrade === "F") {
            academicStatus = "FAIL";
        }
        else {
            academicStatus = "PASS";
        }

        // Display student result
        console.log("========== STUDENT RESULT ==========");
        console.log("Student Name: " + studentName);
        console.log("Attendance: " + attendance + "%");
        console.log("Midterm Score: " + midtermScore);
        console.log("Final Exam Score: " + finalExamScore);
        console.log("Assignment Score: " + assignmentScore);
        console.log("Total Score: " + totalScore);
        console.log("Letter Grade: " + letterGrade);
        console.log("Academic Status: " + academicStatus);
        console.log("====================================");
    }
}