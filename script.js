// Código para armazenar e gerenciar as tarefas

const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

document.addEventListener("DOMContentLoaded", function () {
  const tasksFromCookie = getCookie("tasks");
  if (tasksFromCookie) {
    todoLists.innerHTML = tasksFromCookie;
    allTasks();
  }
});

// Gerenciar cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Ao carregar o documento, recupere tarefas do cookie e preencha a lista
document.addEventListener("DOMContentLoaded", function () {
  const tasksFromCookie = getCookie("tasks");
  if (tasksFromCookie) {
    todoLists.innerHTML = tasksFromCookie;
    allTasks(); // atualiza o contador de tarefas pendentes
  }
});

function allTasks() {
  let tasks = document.querySelectorAll(".pending");
  pendingNum.textContent = tasks.length === 0 ? "0" : tasks.length;
  console.log(tasks);
}

inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();
  //   ;
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = `
    <li class="list pending" onclick="handleStatus(this)">
    <input type="checkbox" />
    <span class="task">${inputVal}</span><i class="uil uil-trash" onclick="deleteTask(this)"></i>
    </li>
    `;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = "";
    console.log(inputVal);
    allTasks();
    setCookie("tasks", todoLists.innerHTML, 36500);
  }
});

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  console.log(checkbox);
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
  setCookie("tasks", todoLists.innerHTML, 36500);
}

function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
  setCookie("tasks", todoLists.innerHTML, 36500);
}

clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
  setCookie("tasks", "", 36500);
});
