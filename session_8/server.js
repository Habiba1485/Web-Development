const fs = require("fs");
const path = require ("path");
const http = require("http");

const filePath = path.join(__dirname,"products.json");

const server = http.createServer(
  (req,res)=> {
    const url = req.url;
    const method = req.method;

    res.setHeader("Content-Type","application/json");

    if (method === "GET" && url === "/products"){
      fs.readFile(filePath, "utf-8", (err, data)=>{
        if(err){
          res.writeHead(500);
          return res.end(JSON.stringify({message:"Error Reading File"}));
        }
        res.writeHead(200);
        res.end(data);
      });
    }

    else if(method === "POST" && url === "/products"){
      let body = "";
      req.on("data", (chunk)=>{
        body+=chunk;
      })
      req.on("end",()=>{
        let product;
        try{
          product = JSON.parse(body);
        }catch{
          res.writeHead(400);
          return res.end(JSON.stringify({message:"invalid JSON"}))
        }

        fs.readFile(filePath,"utf-8",(err,data)=>{
          if(err){
            res.writeHead(500);
            return res.end(JSON.stringify({message:"Erroe Readig File"}));
          }
          const products = JSON.parse(data);
          products.push(product);
          fs.writeFile(filePath, JSON.stringify(products, null, 2),(err)=>{
            if(err){
              res.writeHead(500);
              return res.end(JSON.stringify({message:"Erroe saving File"}))
            }
            res.writeHead(201);
            res.end(JSON.stringify(product))
          });
        });
      });
    }
    
  });

server.listen(5000, ()=>{
  console.log("server is running");
});