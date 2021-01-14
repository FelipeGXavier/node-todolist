import * as task from "./load_task";
import * as render from "./render_task";
import * as addTask from "./add_task";
import * as removeTask from "./remove_task";

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
      const taskItemsElements = Array.from(
        document.getElementsByClassName("list-item")
      );
      taskItemsElements.forEach((element) => {
        element.addEventListener("click", function (event) {
          removeAction(event);
        });
      });
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
          const noTasksMessage = document.querySelector("ul.list > h4");
          if (noTasksMessage) {
            taskListElement.removeChild(noTasksMessage);
          }
          const lastInsert = document.querySelector(".list-item:last-child");
          lastInsert.addEventListener("click", function (event) {
            removeAction(event);
          });
        }
      }
    });
});

const removeAction = (event) => {
  const target = event.target.closest(".list-item");
  const targetId = target.getAttribute("data-id");
  removeTask.remove(event).then((res) => {
    if (res.status === 200) {
      const indexToRemoveFromDom = findIndexFromItem(targetId);
      taskListElement.removeChild(
        taskListElement.children[indexToRemoveFromDom]
      );
      alert("Removido");
    }
  });
  return;
};

const findIndexFromItem = (dataId) => {
  const items = Array.from(taskListElement.children);
  for (let i = 0; i < items.length; i++) {
    const elementId = items[i].getAttribute("data-id");
    if (elementId === dataId) {
      return i;
    }
  }
};

const ping = () => {
  return task
    .ping()
    .then((response) => {
      return response.text();
    })
    .then((body) => console.log(body));
};
