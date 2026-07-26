//Create a function that takes a name and a callback, prints a greeting, then executes the callback.
console.log("========== Task 1 ==========");

function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Habiba", sayGoodbye);


//Write a calculator function that takes two numbers and a callback for operations (add, subtract, multiply).
console.log("\n========== Task 2 ==========");

function calculator(num1, num2, operation) {
    return operation(num1, num2);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

console.log("Addition:", calculator(10, 5, add));
console.log("Subtraction:", calculator(8, 4, subtract));
console.log("Multiplication:", calculator(4, 6, multiply));



//Create a function that simulates loading data and calls a callback when the loading is finished.
console.log("\n========== Task 3 ==========");

function loadData(callback) {
    console.log("Loading data...");

    setTimeout(() => {
        callback();
    }, 1500);
}

function finishedLoading() {
    console.log("Data Loaded Successfully!");
}

loadData(finishedLoading);


//Build a simple authentication flow using callbacks (login → success message → next step).
function login(username, password, callback) {
    console.log("\n========== Task 4 ==========");
    console.log("Checking login...");

    if (username === "admin" && password === "1234") {
        callback();
    } else {
        console.log("Login Failed");
    }
}

function showDashboard() {
    console.log("Login Successful");
    console.log("Welcome to your dashboard!");
}

// Start Task 4 after Task 3 has finished
setTimeout(() => {
    login("admin", "1234", showDashboard);
}, 2000);

