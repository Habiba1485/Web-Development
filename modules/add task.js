let tasks = require("../Data/Task");

function addTask(title){
  if(!title){
    console.log("invalid title");
    return;
  }

  const newTask = {
    id: tasks[tasks.length-1].id+1,
    title,
    status:"Active",
  };


  tasks.push(newTask);
  console.log("Task added");
}