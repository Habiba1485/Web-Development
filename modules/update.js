const tasks = require("../Data/Task");

function updateTask(id, status) {

    for (let task of tasks) {

        if (task.id === id) {
            task.status = status;
            console.log("Task updated.");
            return;
        }

    }

    console.log("Task not found.");
}

module.exports = updateTask;