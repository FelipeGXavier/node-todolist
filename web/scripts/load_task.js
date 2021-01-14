const baseUrl = "http://127.0.0.1:3000/api";
const user = 1;

export function loadTasksByDate(date) {}

export function loadAllTasks() {
  const path = `/user/${user}/tasks`;
  return fetch(`${baseUrl}${path}`);
}

export function ping() {
  const path = "/ping";
  return fetch(`${baseUrl}${path}`);
}
