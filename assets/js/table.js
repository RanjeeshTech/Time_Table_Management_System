const tableDetails = JSON.parse(localStorage.getItem("currentTable")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];



if (currentUser.length == 0) {
    location.replace("./index.html");
} else if (currentUser.length != 0 && tableDetails.length == 0) {
    location.replace("./createTimeTable.html")
} else {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    console.log(tableDetails);

    const backBtn = document.querySelector(".backBtn");
    backBtn.addEventListener("click", () => {
        location.replace('./createTimeTable.html');
        localStorage.setItem("currentTable", JSON.stringify([]));
    })


    var startTime = parseInt(tableDetails.classStartTime);
    var classTiming = parseInt(tableDetails.periodTiming);
    var lunchTiming = parseInt(tableDetails.lunchTiming);
    var lunch = 0;
    const totalPeriods = parseInt(tableDetails.totalPeriods);
    if (totalPeriods % 2 == 0) {
        lunch = totalPeriods / 2;
    } else {
        lunch = Math.floor((totalPeriods / 2) + 1);
    }
    console.log(lunch);
    var currentPeriod = 0;
    var minsHand = 0;

    var allClasses = "";

    function createClasses() {
        for (let i = 0; i <= totalPeriods; i++) {
            allClasses += `
                <tr>
                    ${tablePeriods()}
                </tr>
            `
        }
        return allClasses;
    }

    function tablePeriods() {
        if (minsHand < 10) {
            mins = "0" + minsHand;
        } else {
            mins = minsHand;
        }
        var tablePeriod = "";
        var amORpm = "";

        if (startTime < 12) {
            amORpm = "AM";
        } else {
            amORpm = "PM";
        }
        if (currentPeriod == lunch) {
            tablePeriod += `
                            <td><input type="text" class="form-control" disabled style="background-color: #fff; text-align:center; font-weight:700; padding:0 !important" value="${startTime}:${mins} ${amORpm}"></td>
                            <td colspan="12">
                                <input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff; font-weight:700; text-align:center;" value="LUNCH BREAK">
                            </td>`;
            if (lunchTiming % 60 == 0) {
                startTime += Math.floor((lunchTiming / 60));
            } else {
                startTime += Math.floor((lunchTiming / 60));
                minsHand += lunchTiming % 60;
                if (minsHand >= 60) {
                    startTime += Math.floor((lunchTiming / 60));
                    minsHand = minsHand % 60;
                }
            }
        } else {
            for (let i = 0; i <= tableDetails.workingDays; i++) {
                if (i == 0) {
                    tablePeriod += `<td><input type="text" class="form-control" disabled style="background-color: #fff; text-align:center; font-weight:700; padding:0 !important" value="${startTime}:${mins} ${amORpm}"></td>`;
                } else {
                    tablePeriod += `<td><input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff;"></td>`;
                }
            }
            if (classTiming % 60 == 0) {
                startTime += Math.floor((classTiming / 60));
            } else {
                startTime += Math.floor((classTiming / 60));
                minsHand += classTiming % 60;
                if (minsHand >= 60) {
                    startTime += Math.floor((minsHand / 60));
                    minsHand = minsHand % 60;
                }
            }
        }
        currentPeriod++;

        return tablePeriod;
    }
    var tableHead = "";

    for (let i = 0; i <= tableDetails.workingDays; i++) {
        if (i == 0) {
            tableHead += `<td>TIME/DAY</td>`;
        } else {
            tableHead += `<td>${days[i-1]}</td>`;
        }
    }
    // <tr class="break">
    // <td colspan="12">
    //     <input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff;">
    // </td>
    // </tr>
    const tableContainer = document.querySelector(".tableContainer");
    const basicTableForm = `
            <div class="col-lg-auto">
            <form action="">
                <table>
                    <thead>
                        <tr>
                            ${tableHead}
                        </tr>
                    </thead>
                    ${createClasses()}
                </table>
            </form>
        </div>
    `

    tableContainer.innerHTML = basicTableForm;
}