//Write a program using console.log and setTimeout and predict the output before running it.
console.log("\n========== Task 1 ==========");

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");



// Create a code snippet mixing synchronous logs and setTimeout(0) and explain the execution order.
setTimeout(() => {

    console.log("\n========== Task 2 ==========");

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    console.log("3");

    setTimeout(() => {
        console.log("4");
    }, 0);

    console.log("5");

}, 1000);



// Write a program that demonstrates how JavaScript executes line by line despite asynchronous behavior.
setTimeout(() => {

    console.log("\n========== Task 3 ==========");

    console.log("Step 1");

    setTimeout(() => {
        console.log("Step 3");
    }, 2000);

    console.log("Step 2");

}, 2000);



// Build a small example showing how async tasks are delayed until the call stack is empty.
setTimeout(() => {

    console.log("\n========== Task 4 ==========");

    console.log("Program Started");

    setTimeout(() => {
        console.log("Async Task");
    }, 0);

    for (let i = 1; i <= 3; i++) {
        console.log("Loop:", i);
    }

    console.log("Program Finished");

}, 5000);