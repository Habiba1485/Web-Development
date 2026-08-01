let tasks=require("../Data/Task");

function delete(id){
  let index = tasks.findIndex((tasks)=>tasks.id===id);

  if(index===-1){
    console.log("task not found");
    return;
  }

  tasks.splice(index, 1);
  console.log("task deleted");

}

moduels.exports = delete;
