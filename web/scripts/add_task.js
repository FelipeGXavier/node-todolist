const baseUrl = "http://127.0.0.1:3000/api";

const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const user = 1;

export const handle = () => {
  return {
    title: title.value,
    description: description.value,
    due_date: dueDate.value,
    user_id: user,
  };
};

export const add = () => {
  const path = "/task";
  const task = handle();
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};
