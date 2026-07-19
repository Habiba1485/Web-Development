// Write a program that prints "Hello" immediately and "World" after 2 seconds.
console.log("\n========== Task 1 ==========");

console.log("Hello");

setTimeout(() => {
    console.log("World");
}, 2000);

// Create a function that prints numbers from 1 to 5, each number after 1 second delay.
setTimeout(() => {

    console.log("\n========== Task 2 ==========");

    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }

}, 2500);


//Write a program that shows "Loading..." instantly and "Done" after 3 seconds.
setTimeout(() => {

    console.log("\n========== Task 3 ==========");

    console.log("Loading...");

    setTimeout(() => {
        console.log("Done");
    }, 3000);

}, 8500);


//Simulate a delayed message system using setTimeout.
setTimeout(() => {

    console.log("\n========== Task 4 ==========");

    console.log("Sending...");

    setTimeout(() => {
        console.log("Message Delivered!");
    }, 2000);

}, 12000);