const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

if (currentUser.length == 0) {
    location.replace("./index.html");
}