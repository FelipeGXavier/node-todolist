import * as task from "./load_task";
import * as render from "./render_task";
import * as addTask from "./add_task";
import * as removeTask from "./remove_task";

const taskListElement = document.getElementById("list");
const addTaskBtn = document.getElementById("btn");
const filterInput = document.getElementById("filter");

document.addEventListener("DOMContentLoaded", function () {
  ping();
  task
    .loadAllTasks()
    .then((response) => response.text())
    .then((body) => {
      body = JSON.parse(body);
      const tasks = body.tasks;
      displayTasksInList(tasks);
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
          reset();
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
      if (taskListElement.children.length == 0) {
        taskListElement.insertAdjacentHTML(
          "beforeend",
          `<h4> Nenhuma informação para exibir! </h4>`
        );
      }
      alert("Removido");
    }
  });
  return;
};

filterInput.addEventListener("input", (event) => {
  const inputFilterValue = event.target.value;
  task.loadTasksByDate(inputFilterValue).then((tasks) => {
    displayTasksInList(tasks);
  });
});

const findIndexFromItem = (dataId) => {
  const items = Array.from(taskListElement.children);
  for (let i = 0; i < items.length; i++) {
    const elementId = items[i].getAttribute("data-id");
    if (elementId === dataId) {
      return i;
    }
  }
};

const displayTasksInList = (tasks) => {
  taskListElement.innerHTML = render.renderTasks(tasks);
  const taskItemsElements = Array.from(
    document.getElementsByClassName("list-item")
  );
  taskItemsElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      removeAction(event);
    });
  });
};

const ping = () => {
  return task
    .ping()
    .then((response) => {
      return response.text();
    })
    .then((body) => console.log(body));
};

const reset = () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const dueDate = document.getElementById("dueDate");
  title.value = "";
  description.value = "";
  dueDate.value = "";
};
