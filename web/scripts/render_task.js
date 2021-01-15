import { formatDate } from "./util";

export function renderTasks(tasks) {
  if (tasks.length == 0) {
    return `<h4> Nenhuma informação para exibir! </h4>`;
  } else {
    const tasksHtml = tasks.map((task) => {
      return ` <li class="list-item" data-id="${task.id}">
          <div class="box">
              <h1 class="item-title">${task.title}</h1>
              <span class="due-date">${formatDate(task.due_date)}</span>
          </div>
          <p class="paragraph">${task.description}</p>
      </li>`;
    });
    return tasksHtml.join("");
  }
}

export function appendTask(task) {
  return ` <li class="list-item" data-id="${task.id}">
            <div class="box">
                <h1 class="item-title">${task.title}</h1>
                <span class="due-date">${formatDate(task.due_date)}</span>
            </div>
            <p class="paragraph">${task.description}</p>
        </li>`;
}
