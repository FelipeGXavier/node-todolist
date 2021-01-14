import * as task from "./load_task";
import * as render from "./render_task";
import * as addTask from "./add_task";

const taskListElement = document.getElementById("list");
const addTaskBtn = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", function () {
  ping();
  task
    .loadAllTasks()
    .then((response) => response.text())
    .then((body) => {
      body = JSON.parse(body);
      const tasks = body.tasks;
      const taskHtmlList = render.renderTasks(tasks);
      taskListElement.innerHTML = taskHtmlList;
    });
});

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask
    .add()
    .then((response) => {
      if (response.status === 409) {
        alert("Essa tarefa já existe");
      } else if (response.status === 500) {
        alert("Ocorreu um erro ao adicionar a tarefa");
      } else {
        return response.text();
      }
    })
    .then((result) => {
      if (result) {
        const task = JSON.parse(result);
        if (task.errors) {
          alert("Tarefa Inválida");
        } else {
          taskListElement.insertAdjacentHTML(
            "beforeend",
            render.appendTask(task)
          );
        }
      }
    });
});

const ping = () => {
  return task
    .ping()
    .then((response) => {
      return response.text();
    })
    .then((body) => console.log(body));
};
