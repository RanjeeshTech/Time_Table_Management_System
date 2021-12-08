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


    var startingTime = (tableDetails.classStartTime).split(':');
    var classTiming = parseInt(tableDetails.periodTiming);
    var lunchTiming = parseInt(tableDetails.lunchTiming);
    var breakTiming = parseInt(tableDetails.breakTiming);
    var startTime = parseInt(startingTime[0]);
    var minsHand = parseInt(startingTime[1]);
    var lunch = 0;
    var interval1 = 0;
    var interval2 = 0;
    const totalPeriods = parseInt(tableDetails.totalPeriods);
    if (totalPeriods % 2 == 0) {
        lunch = Math.floor(totalPeriods / 2);
        if (lunch % 2 == 0) {
            interval1 = Math.floor(lunch / 2);
            interval2 = lunch + Math.floor(lunch / 2) + 1;
        } else {
            interval1 = Math.floor(lunch / 2) + 1;
            interval2 = lunch + Math.floor(lunch / 2) + 2;
        }
    } else {
        lunch = Math.floor((totalPeriods / 2) + 1);
        if (lunch % 2 == 0) {
            interval1 = Math.floor(lunch / 2);
        } else {
            interval1 = Math.floor(lunch / 2) + 1;
        }

        interval2 = lunch + Math.floor(lunch / 2) + 1;
    }

    console.log(interval2);
    var currentPeriod = 0;

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
                            <td colspan="12">
                                <input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff; font-weight:700; text-align:center;" value="${startTime}:${mins} ${amORpm} - LUNCH BREAK">
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
                    tablePeriod += `<td><input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff;" placeholder="Click to Add Subject..."></td>`;
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

        if (currentPeriod == interval1 || currentPeriod == interval2) {
            tablePeriod += `<tr>    
                            <td colspan="12">
                                <input type="text" class="form-control" disabled style="cursor: pointer; background-color: #fff; font-weight:700; text-align:center;" value="${startTime}:${mins} ${amORpm} - INTERVAL">
                            </td></tr>`;
            if (breakTiming % 60 == 0) {
                startTime += Math.floor((breakTiming / 60));
            } else {
                startTime += Math.floor((breakTiming / 60));
                minsHand += breakTiming % 60;
                if (minsHand >= 60) {
                    startTime += Math.floor((breakTiming / 60));
                    minsHand = minsHand % 60;
                }
            }
        }
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