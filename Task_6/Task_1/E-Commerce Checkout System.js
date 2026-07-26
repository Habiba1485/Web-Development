let customerName = prompt("Enter customer name:");
let productCategory = prompt("Enter product category (Electronics, Clothing, Grocery):");
let productPrice = Number(prompt("Enter product price:"));
let quantity = Number(prompt("Enter quantity:"));
let couponCode = prompt("Enter coupon code:");
let paymentMethod = prompt("Enter payment method (Cash, Card, Wallet):");

// Calculate subtotal
let subtotal = productPrice * quantity;

// Initialize discounts
let categoryDiscount = 0;
let couponDiscount = 0;
let paymentDiscount = 0;

// Apply category discount
if (productCategory.toLowerCase() === "electronics") {
    categoryDiscount = subtotal * 0.10; // 10%
}
else if (productCategory.toLowerCase() === "clothing") {
    categoryDiscount = subtotal * 0.15; // 15%
}
else if (productCategory.toLowerCase() === "grocery") {
    categoryDiscount = subtotal * 0.05; // 5%
}

// Apply coupon discount
if (couponCode.toUpperCase() === "SAVE10") {
    couponDiscount = subtotal * 0.10; // 10%
}

// Apply payment method discount
if (paymentMethod.toLowerCase() === "wallet") {
    paymentDiscount = subtotal * 0.05; // 5%
}
else if (paymentMethod.toLowerCase() === "card") {
    paymentDiscount = subtotal * 0.02; // 2%
}

// Calculate total discount
let totalDiscount = categoryDiscount + couponDiscount + paymentDiscount;

// Price after discounts
let priceAfterDiscount = subtotal - totalDiscount;

// Calculate VAT (15%)
let vat = priceAfterDiscount * 0.15;

// Final amount
let finalTotal = priceAfterDiscount + vat;

// Display invoice
console.log("========== INVOICE ==========");
console.log("Customer Name: " + customerName);
console.log("Product Category: " + productCategory);
console.log("Product Price: $" + productPrice);
console.log("Quantity: " + quantity);
console.log("------------------------------");
console.log("Subtotal: $" + subtotal);
console.log("Category Discount: $" + categoryDiscount);
console.log("Coupon Discount: $" + couponDiscount);
console.log("Payment Discount: $" + paymentDiscount);
console.log("Total Discount: $" + totalDiscount);
console.log("VAT (15%): $" + vat);
console.log("------------------------------");
console.log("Final Total: $" + finalTotal);
console.log("==============================");