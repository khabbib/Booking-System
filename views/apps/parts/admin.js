const loginBtn = document.getElementById("loginbtn");
const registerBtn = document.getElementById("registerbtn");

loginBtn.addEventListener("click", ()=>{
    document.querySelector(".login-admin-page").style.display = "flex";
    document.querySelector(".register-admin-page").style.display = "none";
    loginBtn.style.display = "none";
    registerBtn.style.display = "flex";
});

registerBtn.addEventListener("click", ()=>{
    loginBtn.style.display = "flex";
    registerBtn.style.display = "none";
    document.querySelector(".login-admin-page").style.display = "none";
    document.querySelector(".register-admin-page").style.display = "flex";
});