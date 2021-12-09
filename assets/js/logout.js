function logout() {
    localStorage.setItem("currentUser", JSON.stringify([]));
    localStorage.setItem("currentTableFacultys", JSON.stringify([]));
    localStorage.setItem("currentTable", JSON.stringify([]));
    location.replace("./index.html");
}