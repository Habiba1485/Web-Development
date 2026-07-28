const readGrades = require ("./read.grade");
const saveGrades = require ("./save.grades");

async function addGrades(name, subject, grade){

  if(!name || !subject || !grade){
    console.log("invaild data");
    return;
  }

  try{
    let grades = await readGrades();

    let newGrade = {
    id: grades[grades.length - 1].id + 1,
    name,
    [subject]: grade
};


    grades.push(newGrade);
    await saveGrades(grades);

  }catch(error){
    console.log(error);
  }

}

module.exports = addGrades;