let tasks = [];
let taskIdCounter = 1;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const completedCount = document.getElementById('completedCount');
const totalCount = document.getElementById('totalCount');
const completionStatus = document.getElementById('completionStatus');

function init() {
    showTasks();
    updateFooter();

    addBtn.onclick = addTask;
    taskInput.onkeypress = e => {
        if (e.key === 'Enter') addTask();
    };
}

function addTask() {
    let text = taskInput.value.trim();
    if (!text) {
        alert("Vui lòng nhập tên công việc!");
        taskInput.focus();
        return;
    }
    tasks.push({ id: taskIdCounter++, text, completed: false });
    taskInput.value = "";
    showTasks();
    updateFooter();
}

function showTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        taskList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">Chưa có công việc nào. Hãy thêm công việc mới!</div>
      </div>
    `;
        return;
    }
    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task-item" + (task.completed ? " completed" : "");
        div.dataset.id = task.id;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        let span = document.createElement("span");
        span.className = "task-text" + (task.completed ? " completed" : "");
        span.textContent = task.text;

        let actions = document.createElement("div");
        actions.className = "task-actions";

        let editBtn = document.createElement("button");
        editBtn.textContent = "✏️ Sửa";
        editBtn.onclick = () => editTask(task.id);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Xóa";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(actions);

        taskList.appendChild(div);
    });
}

function toggleTask(id) {
    let task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        showTasks();
        updateFooter();
    }
}

function editTask(id) {
    let task = tasks.find(t => t.id === id);
    if (!task) return;

    let div = document.querySelector(`[data-id="${id}"]`);
    let actions = div.querySelector(".task-actions");

    let input = document.createElement("input");
    input.type = "text";
    input.value = task.text;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "💾 Lưu";
    saveBtn.onclick = () => saveTask(id, input.value);

    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "❌ Hủy";
    cancelBtn.onclick = showTasks;

    actions.innerHTML = "";
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);

    div.insertBefore(input, actions);
    input.focus();
}

function saveTask(id, newText) {
    newText = newText.trim();
    if (!newText) {
        alert("Tên công việc không được để trống!");
        return;
    }
    let task = tasks.find(t => t.id === id);
    if (task) task.text = newText;
    showTasks();
    updateFooter();
}

function deleteTask(id) {
    let task = tasks.find(t => t.id === id);
    if (!task) return;
    if (confirm("Xóa công việc \"" + task.text + "\"?")) {
        tasks = tasks.filter(t => t.id !== id);
        showTasks();
        updateFooter();
    }
}

function updateFooter() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;
    totalCount.textContent = total;
    completedCount.textContent = completed;
    completionStatus.innerHTML = (total > 0 && completed === total)
        ? `<div class="completion-badge">✅ Hoàn thành tất cả!</div>`
        : "";
}

init();