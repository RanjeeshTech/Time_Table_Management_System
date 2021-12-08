const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
let tableDetails = JSON.parse(localStorage.getItem("currentTable")) || [];

const dashboard = document.querySelector(".dash-section");
const resetbtn = document.querySelector(".resetbtn");

resetbtn.addEventListener("click", () => {
    document.querySelector(".dept").value = "";
    document.querySelector(".workingDays").value = "";
    document.querySelector(".lunchTiming").value = "";
    document.querySelector(".breakTiming").value = "";
    document.querySelector(".section").value = "";
    document.querySelector(".totalPeriods").value = "";
    // document.querySelector(".totalBreaks").value = "";
    document.querySelector(".classStartTime").value = "";

    localStorage.setItem("currentTable", JSON.stringify([]));
})

if (currentUser.length == 0) {
    location.replace("./index.html");
} else if (tableDetails.length != 0) {
    location.replace("./table.html");
} else {
    dashboard.addEventListener("submit", (e) => {
        e.preventDefault();
        const department = document.querySelector(".dept").value;
        const workingDays = document.querySelector(".workingDays").value;
        const lunchTiming = document.querySelector(".lunchTiming").value;
        const breakTiming = document.querySelector(".breakTiming").value;
        const section = document.querySelector(".section").value;
        const totalPeriods = document.querySelector(".totalPeriods").value;
        // const totalBreaks = document.querySelector(".totalBreaks").value;
        const classStartTime = document.querySelector(".classStartTime").value;
        const periodTiming = document.querySelector(".periodTiming").value;

        tableDetails = {
            department: department,
            workingDays: workingDays,
            lunchTiming: lunchTiming,
            breakTiming: breakTiming,
            section: section,
            totalPeriods: totalPeriods,
            // totalBreaks: totalBreaks,
            classStartTime: classStartTime,
            periodTiming: periodTiming
        }
        localStorage.setItem("currentTable", JSON.stringify(tableDetails));

        setTimeout(function() {
            location.replace("./table.html");
        }, 1000)
    })

}