const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
const tableContainer = document.querySelector(".tableContainer");
const currentFacultyTable = JSON.parse(localStorage.getItem("currentFacultyTable"));

if (currentUser.length == 0) {
    location.replace("./index.html");
}

tableContainer.innerHTML = currentUser.currentTables[currentFacultyTable].table;