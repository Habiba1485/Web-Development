let tasks=require("../Data/Task");

function listTasks(){

  console.log("==========tasks==========");

  if(tasks.length == 0){
    console.log("no tasks");
    return;
  }

  for(let i of tasks){
    console.log(
      `task id:${i.id} - task title:${i.title} - task status${i.stat}`
    )
  }
}