let employees = [];
let currentId = 1;
let editingId = null;

const form = document.getElementById("employee-form");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const dobInput = document.getElementById("dateOfBirth");
const positionInput = document.getElementById("position");

const errorFullName = document.getElementById("error-fullName");
const errorEmail = document.getElementById("error-email");
const errorDob = document.getElementById("error-dateOfBirth");
const errorPosition = document.getElementById("error-position");

const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

const tbody = document.getElementById("employee-tbody");
const employeeCount = document.getElementById("employee-count");
const footerCount = document.getElementById("footer-count");

function showEmployees() {
    tbody.innerHTML = "";
    employees.forEach(emp => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.fullName}</td>
      <td>${emp.email}</td>
      <td>${emp.dob}</td>
      <td>${emp.position}</td>
      <td>
        <button onclick="editEmployee(${emp.id})">Sửa</button>
        <button onclick="deleteEmployee(${emp.id})">Xóa</button>
      </td>
    `;
        tbody.appendChild(tr);
    });
    employeeCount.textContent = employees.length + " nhân viên";
    footerCount.textContent = "Tổng số nhân viên: " + employees.length;
}

function clearErrors() {
    errorFullName.textContent = "";
    errorEmail.textContent = "";
    errorDob.textContent = "";
    errorPosition.textContent = "";
}

form.onsubmit = function (e) {
    e.preventDefault();
    clearErrors();

    let fullName = fullNameInput.value.trim();
    let email = emailInput.value.trim();
    let dob = dobInput.value;
    let position = positionInput.value.trim();

    if (!fullName) { errorFullName.textContent = "Họ tên trống"; return; }
    if (!email) { errorEmail.textContent = "Email trống"; return; }
    if (!dob) { errorDob.textContent = "Ngày sinh trống"; return; }
    if (!position) { errorPosition.textContent = "Chức vụ trống"; return; }

    if (editingId === null) {
        employees.push({ id: currentId++, fullName, email, dob, position });
    } else {
        let emp = employees.find(e => e.id === editingId);
        if (emp) {
            emp.fullName = fullName;
            emp.email = email;
            emp.dob = dob;
            emp.position = position;
        }
        editingId = null;
        formTitle.textContent = "Thêm Nhân Viên Mới";
        submitBtn.textContent = "Thêm Nhân Viên";
        cancelEditBtn.classList.add("hidden");
    }

    form.reset();
    showEmployees();
};

function editEmployee(id) {
    let emp = employees.find(e => e.id === id);
    if (!emp) return;
    editingId = id;
    fullNameInput.value = emp.fullName;
    emailInput.value = emp.email;
    dobInput.value = emp.dob;
    positionInput.value = emp.position;
    formTitle.textContent = "Chỉnh Sửa Nhân Viên";
    submitBtn.textContent = "Cập Nhật";
    cancelEditBtn.classList.remove("hidden");
}

function deleteEmployee(id) {
    let emp = employees.find(e => e.id === id);
    if (!emp) return;
    if (confirm("Xóa nhân viên " + emp.fullName + "?")) {
        employees = employees.filter(e => e.id !== id);
        if (editingId === id) {
            editingId = null;
            form.reset();
            formTitle.textContent = "Thêm Nhân Viên Mới";
            submitBtn.textContent = "Thêm Nhân Viên";
            cancelEditBtn.classList.add("hidden");
        }
        showEmployees();
    }
}

cancelEditBtn.onclick = function () {
    editingId = null;
    form.reset();
    formTitle.textContent = "Thêm Nhân Viên Mới";
    submitBtn.textContent = "Thêm Nhân Viên";
    cancelEditBtn.classList.add("hidden");
};

showEmployees();