function calculateShipping(weight){
  return new Promise((resolve,reject)=>{

if(weight>0){

  const cost = weight*5;
  resolve("Shipping cost:" + cost);
}else{
  reject("Invalid weight");
}

  });
}

calculateShipping(30)
.then(msg=>console.log(msg))
.catch(error=>console.log(error));

calculateShipping(0);