import { formatDate } from "./util";

const baseUrl = "http://127.0.0.1:3000/api";
const user = 1;

export function loadTasksByDate(date) {
  date = formatDate(date);
  return loadAllTasks()
    .then((res) => res.text())
    .then((result) => {
      const tasksResponse = JSON.parse(result).tasks;
      const filteredTasks = [];
      tasksResponse.forEach((task) => {
        const taskDate = formatDate(task.due_date);
        if (taskDate === date) {
          filteredTasks.push(task);
        }
      });
      return filteredTasks;
    });
}

export function loadAllTasks() {
  const path = `/user/${user}/tasks`;
  return fetch(`${baseUrl}${path}`);
}

export function ping() {
  const path = "/ping";
  return fetch(`${baseUrl}${path}`);
}
