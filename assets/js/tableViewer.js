const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
const tableContainer = document.querySelector(".tableContainer");

if (currentUser.length == 0) {
    location.replace("./index.html");
}

tableContainer.innerHTML = currentUser.currentTables[0].table;