const readBooks = require("./read");
const saveBooks = require("./save");

async function updateBook(id,name){

  if(!name){
    console.log("name not found");
    return;
  }

  try{
    let books= await saveBooks;

    let book = books.find((b)=>b.id == id);
    if(!book){
      console.log("book not found");
      return;
    }

    book.name=name;
    await saveBooks(books);
    console.log("book updated");
  }catch(err){
    console.log(err);
  }
}