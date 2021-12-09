const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];

if (currentUser.length == 0) {
    location.replace("./index.html");
}

const changeUsername = document.querySelector(".changeUsername");
const resetbtn = document.querySelector(".resetbtn");
const updatebtn = document.querySelector(".updatebtn");

resetbtn.addEventListener("click", () => {
    changeUsername.value = "";
})


updatebtn.addEventListener("click", () => {

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == currentUser.currentEmail) {
            users[i].username = changeUsername.value;
            currentUser.currentUserName = changeUsername.value;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    changeUsername.value = "";
})