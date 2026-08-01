const readBooks = require("./read");
const saveBooks = require("./save");

async function deleteBook(id){
  try{
    let books = await readBooks;

    let index = books.findIndix((b)=>b.id==id);
    if(index == -1){
      console.log("book not found");
      return;
    }

    books.splice(index, 1);
    await saveBooks(books);

  }catch(err){
    console.log(err);
  }
}

module.exports=deleteBook;