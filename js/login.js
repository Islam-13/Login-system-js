// inputs selection
var emailInput = document.getElementById("uEmail");
var passInput = document.getElementById("uPassword");
// alert selection
var alertMsg = document.querySelector(".alert-msg");
var alertEmail = document.querySelector(".alert-email");
var alertPassword = document.querySelector(".alert-password");
// btn selection
var loginBtn = document.querySelector(".signup-btn");
var eyeIcon = document.querySelector(".eye-icon");

var usersList = [];

if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

// event listeners
loginBtn.addEventListener("click", login);

emailInput.addEventListener("blur", function () {
  inputAlert(emailValidation, emailInput, alertEmail, "email");
});

passInput.addEventListener("focus", function () {
  eyeIcon.style.display = "block";
});

eyeIcon.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-eye-slash")) {
    eyeIcon.classList.add("show-btn");
    passInput.setAttribute("type", "text");
  } else if (e.target.classList.contains("fa-eye")) {
    eyeIcon.classList.remove("show-btn");
    passInput.setAttribute("type", "password");
  }
});

// functions
function login() {
  alertMsg.classList.remove(`alert-danger`);

  var user = usersList.filter((user) => user.email === emailInput.value);

  if (user.length == 0)
    alert("Email is not existed! Please Sign up a new account", "danger");
  else if (user) {
    if (user[0].password == passInput.value) {
      window.location.href = "./home.html";
      localStorage.setItem("active-user", `${user[0].name}`);
    } else passwordAlert(passInput, alertPassword, "password");
  }
}

function alert(text, action) {
  alertMsg.classList.remove("alert-danger", "alert-success");
  alertMsg.innerHTML = text;
  alertMsg.classList.add(`alert-${action}`);
}

function emailValidation() {
  var emailReg = /[a-z-_.0-9]{3,20}\@[a-z]{2,8}\.[a-z]{2,3}$/;
  if (emailReg.test(emailInput.value)) return true;
  else return false;
}

function inputAlert(validation, name, nameA, msg) {
  validation();
  if (validation()) {
    name.style.borderColor = "#4b5563";
    nameA.innerHTML = "";
    nameA.classList.remove("alert-danger");
  } else {
    name.style.borderColor = "#F44336";
    nameA.innerHTML = `This ${msg} is not correct, <strong>Please enter a vaild one</strong>`;
    nameA.classList.add("alert-danger");
  }
}

function passwordAlert(name, nameA, msg) {
  alertMsg.innerHTML = "";
  name.style.borderColor = "#F44336";
  nameA.innerHTML = `This ${msg} is not correct, <strong>Please enter a vaild one</strong>`;
  nameA.classList.add("alert-danger");
}
