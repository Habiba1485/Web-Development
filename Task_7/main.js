const readGrade = require("./modules/read.grade");
const saveGrades = require("./modules/save.grades");
const addGrades = require("./modules/add.grade");
const updateGrade = require("./modules/update.grade");
const deleteGrade = require("./modules/delete.grade");


async function main() {

    console.log("===== Initial Data =====");
    console.log(await readGrade());

  
    await addGrades("Ali", "Physics", 90);
     console.log("\n===== After Add =====");
    console.log(await readGrade());

   
     await updateGrade(1, "Physics", 95);
     console.log("\n===== After Update =====");
    console.log(await readGrade());


    await deleteGrade(2);
     console.log("\n===== After Delete =====");
     console.log(await readGrade());

}

main();