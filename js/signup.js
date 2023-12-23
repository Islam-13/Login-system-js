// inputs selection
var nameInput = document.getElementById("uName");
var emailInput = document.getElementById("uEmail");
var passInput = document.getElementById("uPassword");
// alert selection
var alertMsg = document.querySelector(".alert-msg");
var alertNameImg = document.querySelector(".alert-name-image");
var alertEmailImg = document.querySelector(".alert-email-image");
var alertPasswordImg = document.querySelector(".alert-password-image");
var alertName = document.querySelector(".alert-name");
var alertEmail = document.querySelector(".alert-email");
var alertPassword = document.querySelector(".alert-password");
var passwordPopup = document.querySelector(".password-popup");
// btn selection
var signupBtn = document.querySelector(".signup-btn");
var eyeIcon = document.querySelector(".eye-icon");

var usersList = [];

if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

// event listeners
signupBtn.addEventListener("click", signUp);

nameInput.addEventListener("blur", function () {
  inputAlert(nameValidation, nameInput, alertName, alertNameImg, "name");
});

emailInput.addEventListener("blur", function () {
  inputAlert(emailValidation, emailInput, alertEmail, alertEmailImg, "email");
});

passInput.addEventListener("blur", function () {
  inputAlert(
    passwordValidation,
    passInput,
    alertPassword,
    alertPasswordImg,
    "password"
  );
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
function signUp() {
  if (nameValidation() && emailValidation() && passwordValidation()) {
    if (!localStorage.getItem("users")) {
      addUser();
    } else if (localStorage.getItem("users") && checkLocal()) {
      alert("Email already exists! Please Login", "danger");
    } else if (localStorage.getItem("users") && !checkLocal()) {
      addUser();
    }
  } else if (!nameValidation()) {
    inputAlert(nameValidation, nameInput, alertName, alertNameImg, "name");
  } else if (!emailValidation()) {
    inputAlert(emailValidation, emailInput, alertEmail, alertEmailImg, "email");
  } else if (!passwordValidation()) {
    passwordAlert(
      passwordValidation,
      passInput,
      alertPassword,
      alertPasswordImg,
      "password"
    );
  }
}

function addUser() {
  var userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
  };

  usersList.push(userData);
  localStorage.setItem("users", JSON.stringify(usersList));
  alert("Account created successfully.", "success");
  reset();
}

function checkLocal() {
  if (usersList.length > 0) {
    if (usersList.find((user) => user.email === emailInput.value)) {
      return true;
    } else return false;
  }
}

function alert(text, action) {
  alertMsg.classList.remove("alert-danger", "alert-success");
  alertMsg.innerHTML = text;
  alertMsg.classList.add(`alert-${action}`);
}

function reset() {
  nameInput.value = "";
  nameInput.style.borderColor = "#4b5563";
  alertNameImg.innerHTML = "";
  emailInput.value = "";
  emailInput.style.borderColor = "#4b5563";
  alertEmailImg.innerHTML = "";
  passInput.value = "";
  passInput.style.borderColor = "#4b5563";
  alertPasswordImg.innerHTML = "";
  eyeIcon.style.display = "none";
}

function nameValidation() {
  var nameReg = /[A-Za-z]{1}[a-z]{2,10} [A-Za-z]{1}[a-z]{2,10}$/;
  if (nameReg.test(nameInput.value)) return true;
  else return false;
}

function emailValidation() {
  var emailReg = /[a-z-_.0-9]{3,20}\@[a-z]{2,8}\.[a-z]{2,3}$/;
  if (emailReg.test(emailInput.value)) return true;
  else return false;
}

function passwordValidation() {
  var passReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (passReg.test(passInput.value)) return true;
  else return false;
}

function inputAlert(validation, name, nameA, nameImg, msg) {
  validation();
  if (validation()) {
    name.style.borderColor = "green";
    nameA.innerHTML = "";
    nameA.classList.remove("alert-danger");
    nameImg.innerHTML = `<img src="./check-mark.png" class="w-100" alt="" />`;
    if (msg == "password") passwordPopup.classList.remove("show");
  } else {
    name.style.borderColor = "#F44336";
    nameA.innerHTML = `This ${msg} is not correct, <strong>Please enter a vaild one</strong>`;
    nameA.classList.add("alert-danger");
    nameImg.innerHTML = `<img src="./close.png" style="width: 17px" alt="" />`;
    if (msg == "password") passwordPopup.classList.add("show");
  }
}
