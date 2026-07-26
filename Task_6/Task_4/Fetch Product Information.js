function getProduct(id){
  return new Promise( (resolve,reject)=>{
    const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};
if (products[id]) {
            resolve(products[id]);  
        } else {
            reject(`Product with ID ${id} not found`); 
        }

});
}

getProduct(2)
.then(product => console.log(product))
.catch(error => console.log(error));