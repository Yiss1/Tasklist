// Define UI variables

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");

form.addEventListener("submit", addTask);

document.addEventListener("DOMContentLoaded", getTasks);

// Remove task event
// we need to use event delegation
taskList.addEventListener("click", removeTask);

// Clear tasks event
clearBtn.addEventListener("click", clearTasks);

// Filter tasks event
filter.addEventListener("keyup", filterTasks);

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task!");
  } else {
    // Create li element
    const li = document.createElement("li");

    // Add CSS class
    li.className = "collection-item";

    // Create text node with task input value and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement("a");

    // Add CSS class
    link.className = "delete-item secondary-content";

    // Add icon
    link.innerHTML = '<i class="material-icons">delete</i>';

    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon
    link.innerHTML = '<i class="material-icons">delete</i>';
    // Append the link
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Remove task
function removeTask(e) {
  // console.log(e.target.parentElement.parentElement)
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target.parentElement.parentElement)
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (task === taskItem.firstChild.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  // taskList.innerHTML = ''

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from local storage
  clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
