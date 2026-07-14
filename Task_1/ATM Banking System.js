let userPIN = "1234";
let balance = 1000;

// Ask the user to enter the PIN
let enteredPIN = prompt("Enter your 4-digit PIN:");

// Validate PIN
if (enteredPIN === userPIN) {

    let operation = prompt(
        "Select an operation:\n" +
        "1. Withdraw\n" +
        "2. Deposit\n" +
        "3. Check Balance\n" +
        "4. Change PIN"
    );

    switch (operation) {

        case "1":
            let withdrawAmount = Number(prompt("Enter withdrawal amount:"));

            if (withdrawAmount <= 0) {
                console.log("Error: Please enter a valid amount.");
            } else if (withdrawAmount > balance) {
                console.log("Error: Insufficient balance.");
            } else {
                balance -= withdrawAmount;
                console.log("Withdrawal successful.");
                console.log("Withdrawn Amount: $" + withdrawAmount);
                console.log("Remaining Balance: $" + balance);
            }
            break;

        case "2":
            let depositAmount = Number(prompt("Enter deposit amount:"));

            if (depositAmount <= 0) {
                console.log("Error: Deposit amount must be greater than zero.");
            } else {
                balance += depositAmount;
                console.log("Deposit successful.");
                console.log("Deposited Amount: $" + depositAmount);
                console.log("Current Balance: $" + balance);
            }
            break;

        case "3":
            console.log("Current Balance: $" + balance);
            break;

        case "4":
            let newPIN = prompt("Enter a new 4-digit PIN:");

            if (newPIN.length === 4 && !isNaN(newPIN)) {
                userPIN = newPIN;
                console.log("PIN changed successfully.");
            } else {
                console.log("Error: PIN must contain exactly four digits.");
            }
            break;

        default:
            console.log("Error: Invalid operation selected.");
    }

} else {
    console.log("Error: Incorrect PIN. Access denied.");
}