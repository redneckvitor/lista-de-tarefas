// Código para armazenar e gerenciar as tarefas

const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

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
  }
});

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  console.log(checkbox);
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
}

function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
}

clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});
