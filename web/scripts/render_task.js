export function renderTasks(tasks) {
  if (tasks.length == 0) {
    return `<h4> Nenhuma informação para exibir! </h4>`;
  } else {
    const tasksHtml = tasks.map((task) => {
      return ` <li class="list-item">
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
  return ` <li class="list-item">
            <div class="box">
                <h1 class="item-title">${task.title}</h1>
                <span class="due-date">${formatDate(task.due_date)}</span>
            </div>
            <p class="paragraph">${task.description}</p>
        </li>`;
}

function formatDate(date) {
  date = new Date(date);
  const day = date.getDate();
  let month = date.getMonth() + 1;
  month = month.toString().length == 1 ? `0${month}` : month;
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  return formatedDate;
}
