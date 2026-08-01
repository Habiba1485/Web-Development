const readBooks = require("./modules/read");
const saveBooks = require("./modules/save");
const addBook = require("./modules/add");
const updateBook = require("./modules/update");
const deleteBook = require("./modules/delete");


async function main(){


  console.log(await readBooks());
}