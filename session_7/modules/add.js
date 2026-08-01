const readBooks = require("./read");
const saveBooks = require("./save");

async function addBook(name,author,year){

  if(!name || !author || !year){
    console.log("invaild data");
    return;
  }

  try{

    let books = await readBooks;
    let book={
      id:books[books.length-1].id+1,
      name,
      author,
      year,
    };

    books.push(book);
    await saveBooks(books);

  }catch(err){
    console.log(err);
  }
}

module.exports =addBook;