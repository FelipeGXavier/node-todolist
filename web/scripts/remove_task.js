const baseUrl = "http://127.0.0.1:3000/api";
const user = 1;

export function remove(task) {
  const element = task.target.closest(".list-item");
  const taskId = parseInt(element.getAttribute("data-id"), 10);
  return fetch(`${baseUrl}/task/${taskId}/user/${user}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
