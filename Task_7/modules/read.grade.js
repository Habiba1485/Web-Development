const {readFile} = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname,"../data/grades.json");

async function readGrade(){

try{
  const data = await readFile(filePath,"utf-8");
  const grades = JSON.parse(data);
  return grades;


}catch(error){
  console.log(error);
}

}
module.exports = readGrade;
