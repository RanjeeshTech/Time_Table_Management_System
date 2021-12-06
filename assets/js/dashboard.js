const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const helloUser = document.querySelector(".faculty-name");

if (currentUser.length == 0) {
    location.replace("./index.html");
}

helloUser.innerHTML = (currentUser.currentUserName).split(' ')[0];

console.log(currentUser.currentUserName);