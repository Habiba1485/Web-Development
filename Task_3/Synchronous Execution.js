//Write a program that logs three messages in order: "Start", "Middle", "End".
console.log("\n========== Task 1 =========");

function logMessages() {
  console.log("Start");
  console.log("Middle");
  console.log("End");
}

logMessages();


//Create a function that calls another function and logs the execution order step by step.
console.log("\n========== Task 2 ==========");

function secondFunction() {
    console.log("Inside Second Function");
}

function firstFunction() {
    console.log("Inside First Function");
    secondFunction();
    console.log("Back to First Function");
}

console.log("Program Starts");
firstFunction();
console.log("Program Ends");




//Write a program that performs two or more calculations sequentially and prints the results.
console.log("\n========== Task 3 ==========");

let num1 = 20;
let num2 = 5;

let sum = num1 + num2;
console.log("Sum =", sum);

let difference = num1 - num2;
console.log("Difference =", difference);




//Build a simple function flow where one function depends on the result of another function.
console.log("\n========== Task 4 ==========");

function square(number) {
    return number * number;
}

function displaySquare(number) {
    let result = square(number);
    console.log("Square =", result);
}

displaySquare(6);

