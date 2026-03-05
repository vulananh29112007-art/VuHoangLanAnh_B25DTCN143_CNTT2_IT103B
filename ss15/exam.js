const cart = [];

const taskInputEmail = document.getElementById("email");
let taskTextEmail = taskInputEmail.value.trim();
cart.push(taskTextEmail);

const taskInputPassword = document.getElementById("password");
let taskTextPassword = taskInputPassword.value.trim();
cart.push(taskTextPassword);

const taskInputAgainpassword = document.getElementById("againpassword");
let taskTextAgainPassword = taskInputPassword.value.trim();
cart.push(taskTextAgainPassword);