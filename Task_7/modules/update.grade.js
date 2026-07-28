const readGrades = require ("./read.grade");
const saveGrades = require ("./save.grades");

async function updateGrade(id, subject, grade) {

    if (!subject || grade == null) {
        console.log("Invalid data");
        return;
    }


  try{
    let grades = await readGrades();

    let record = grades.find((g)=>g.id == id);
    if(!record){
      console.log("grade not found");
      return;
    }

    record.grades[subject] = grade;
    await saveGrades(grades);
    console.log("grade updated");
  }catch(err){
    console.log(err);
  }
}

module.exports = updateGrade;