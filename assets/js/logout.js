function logout() {
    localStorage.setItem("currentUser", JSON.stringify([]));
    location.replace("./index.html");
}