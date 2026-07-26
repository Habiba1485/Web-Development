let cart = require("../data/cart");

function listCart() {

    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    console.log("Cart:");

    cart.forEach(item => {
        console.log(`${item.id} - ${item.name} - $${item.price}`);
    });
}

module.exports = listCart;