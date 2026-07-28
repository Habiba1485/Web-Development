const readGrades = require ("./read.grade");
const saveGrades = require ("./save.grades");

async function deleteGrade(id){
  try{
    let grades = await readGrades();

    let index = grades.findIndex((g)=>g.id==id);
    if(index == -1){
      console.log("grade not found");
      return;
    }

    grades.splice(index, 1);
    await saveGrades(grades);

  }catch(err){
    console.log(err);
  }
}

module.exports = deleteGrade;;