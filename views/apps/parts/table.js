


// const form = document.querySelector(".partet-time");
// const yearInput = document.getElementById("year");


// var time = new Date();
// //var newTime = time.getFullYear() + "/" + time.getMonth() + "/" + time.getDay()
// var timeYMD = [time.getFullYear(), time.getMonth()+1, time.getDate()];

// yearInput.innerHTML = timeYMD[0] + "/" + timeYMD[1] + "/" + timeYMD[2];

// var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];
// var eachWeek = 7;
// var week = [];
// var maxMonth = 12;    
// var minDays = 0;    
// var minMonth = 0;   
// var changeWeeks = 0; 




// // year
// var workYear = 1;

// // months
// var workMonth = 12;
// var totalWorkMonth = workYear*workMonth;

// // days
// var workDays = 5;
// var totalWorkDays = workDays*totalWorkMonth;

// // our
// var workTime = 8; //[8, 4, 8, 7, 4, 0, 0]
// var meetingT = 30;
// var workTimeInMin = workTime*60; // []
// var workTime2 = [10, 4, 8, 7, 6, 0, 0];
// var workTime2inmin = []; // [8*60, 4*60....]

// // change week to minuts
// for (let i = 0; i < workTime2.length; i++) {
//     const element = workTime2[i];
//     workTime2inmin.push(element*60);
// };


// // testing weeks work times per minuts
// for (let i = 0; i < workTime2inmin.length; i++) {
//     const element = workTime2inmin[i];
//     console.log(element);
    
// };

const devss = document.querySelector(".devss");

// globel loop for each days in week
// for (let x = 0; x < workTime2inmin.length; x++) {
//     const element = workTime2inmin[x];
    
//     // inputs times
//     var unikTime = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);
//     var uniktime2 = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);

//     var listone = 0;
//     // if(workTime2inmin[x]%meetingT == 0){
//     //     form.innerHTML += `<div class='inputs-dev' id='${x}'></div>`;
//     //     for(let i = 0;i <  (workTime2inmin[x]/meetingT); i++){
//     //         uniktime2.setTime(uniktime2.getTime()+(30 * 60 * 1000));
//     //         const inputsDev2 = document.getElementById(`${x}`);
//     //         inputsDev2.innerHTML += `<input class="parttimes" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}"> <input type="text" id="" value="" style="display: none;"/>`
//     //         unikTime.setTime(unikTime.getTime()+(30 * 60 * 1000));
            
//     //     }
//     // }
    
// };

   



///////////
////////////// STEPS pages
///////////





///////////
////////////// transpher value of inputs
///////////
function transferValue(){
    var formAPC = document.getElementById("formAPC"); // the whole form that pop up and pop down
    var itemCont = document.querySelector(".partet-time");
    var showTime = document.getElementById("change-size-h"); // dev that get time from table
    const time = document.getElementsByClassName(".parttimes");
    

    itemCont.addEventListener("click", (event)=>{
        if(event.target.className != "parttimes") return;

        else{
            singleSelect(event.target);
        }
        
    });

    itemCont.onmousedown = function(){
        return false;
    };


    function singleSelect(li){
        console.log(li.parentNode.id)
        let selected = itemCont.querySelectorAll('.selected');
        for (let  el of selected) {
            el.classList.remove('selected');
            showTime.style.opacity = "0";
        }
        formAPC.style.cssText = "animation: flow 1s; display: flex;";
        li.classList.add('selected');
        document.getElementById("timeAP").setAttribute("value", li.value);
        showTime.style.opacity = "1";
        showTime.innerHTML = `Your chosen time is:<br> <span id="hourmin"> ${li.value}</span>`;
        
    }


}

transferValue();


///////////
////////////// date changes 
///////////

function dateChanges(){
    var weekDays = document.getElementById("weekDays");
    
    var days = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var daysName = ["Mön", "Tis", "Ons", "Tur", "Fre", "Lör", "Son"];
    
    var today = new Date();
    var todaysDay = today.getDate();
    var firstDayinWeek = todaysDay - today.getDay()+1;
    var lastDayinWeek = todaysDay - today.getDay();
    var newdate = new Date(today.getFullYear(), today.getMonth(), firstDayinWeek);
    var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    

    var btnF = document.querySelector(".btnFarward");
    var btnB = document.querySelector(".btnBackward");
    for (let i = 0; i <= 6; i++) {
        newdate.setDate(firstDayinWeek++)
        console.log(newdate)
        days.push(newdate.getDate());
        weekDays.innerHTML += `<div class="weekdays" id='${i}'>${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
    }
    
    btnF.addEventListener("click", ()=>{
        weekDays.innerHTML = "";
        for (let i = 0; i <= 6; i++) {
            newdate.setDate(firstDayinWeek++)
            console.log(newdate)
            days.push(newdate.getDate());
            newdate.getmon
            if (firstDayinWeek >= maxDays[newdate.getMonth()])  {
                firstDayinWeek = 1;
                newdate.setDate(0)  
                newdate.setMonth(newdate.getMonth()+1)           
                
            }
            console.log(newdate.getMonth());
            console.log(firstDayinWeek);
            console.log(newdate);
            weekDays.innerHTML += `<div class="weekdays" id='${i}'> ${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]} </div>`;
        }
        console.log(days)
    });
    // btnB.addEventListener("click", ()=>{
    //     weekDays.innerHTML = "";
    //     for (let i = 0; i <= 6; i++) {
    //         newdate.setDate(lastDayinWeek--)
    //         console.log(newdate)
    //         days.push(newdate.getDate());
    //         weekDays.innerHTML += `<div class="weekdays" id='${i}'> ${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
    //     }
    //     weekDays.style.cssText = "display: flex; flex-direction: row-column; background: red;";
    //     console.log(days)
    // });

}
dateChanges();