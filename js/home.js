var user = document.querySelector(".userName");
var logoutBtn = document.querySelector(".logout-btn");

user.innerHTML = `Welcome ${localStorage.getItem("active-user")}.`;
logoutBtn.addEventListener("click", function () {
  window.location.href = "./login.html";
});
