const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAll");
const filterSelect = document.getElementById("filterSelect");
const deletePopup = document.getElementById("deletePopup");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let tasks = [];
let currentFilter = "all"; // default tampil semua

function renderTasks() {
  taskList.innerHTML = "";

  // Filter tasks sesuai pilihan dropdown
  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true; // "all"
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date || "-"}</td>
      <td>
        <span class="status ${task.completed ? "completed" : "pending"}">
          ${task.completed ? "Completed" : "Pending"}
        </span>
      </td>
      <td>
        <button class="action-btn done" onclick="toggleTask(${index})">✔</button>
        <button class="action-btn remove" onclick="deleteTask(${index})">✖</button>
      </td>
    `;
    taskList.appendChild(tr);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskName === "") return;

  tasks.push({ name: taskName, date: taskDate, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Tombol Add
addBtn.addEventListener("click", addTask);

// Tombol Delete All (dengan konfirmasi)
deleteAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("Tidak ada task untuk dihapus.");
    return;
  }
  if (confirm("Apakah kamu yakin ingin menghapus semua task?")) {
    tasks = [];
    renderTasks();
  }
});

// Dropdown Filter
filterSelect.addEventListener("change", (e) => {
  currentFilter = e.target.value;
  renderTasks();
});

renderTasks();
