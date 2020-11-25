



































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
    var newdate = new Date(today.getFullYear(), today.getMonth(), firstDayinWeek);
    var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];


    // console.log(today.getDay()+1)
    // console.log(todaysDay)
    // console.log(firstDayinWeek)
    // console.log(newdate)
    // console.log(days)
    
  


    // On default = this week
    for (let i = 0; i <= 6; i++) {
        newdate.setDate(firstDayinWeek++)
        weekDays.innerHTML += `<div class="weekdays" id='${i}'>${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
        if (firstDayinWeek > maxDays[newdate.getMonth()])  {
            newdate.setDate(firstDayinWeek - maxDays[newdate.getMonth()] );  
            firstDayinWeek = 1;
            newdate.setMonth(newdate.getMonth()+1)           
            
        }
        
    }

 
   // farward the times
    var btnF = document.querySelector(".btnFarward");
    
    btnF.addEventListener("click", ()=>{
        weekDays.innerHTML = "";
        for (let i = 0; i <= 6; i++) {
            newdate.setDate(firstDayinWeek++)
            console.log(firstDayinWeek)
            weekDays.innerHTML += `<div class="weekdays" id='${i}'>${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
            if (firstDayinWeek > maxDays[newdate.getMonth()])  {
                newdate.setDate(firstDayinWeek - maxDays[newdate.getMonth()] );  
                firstDayinWeek = 1;
                newdate.setMonth(newdate.getMonth()+1)           

            }
            
        }
    });

   // farward the times
    // var btnB = document.querySelector(".btnBackward");

    // btnB.addEventListener("click", ()=>{
    //     weekDays.innerHTML = "";
    //     for (let i = 0; i <= 6; i++) {
    //         newdate.setDate(firstDayinWeek++)
    //         console.log(firstDayinWeek)
    //         // console.log(maxDays[newdate.getMonth()])
    //         // weekDays.style.cssText = "flex-direction: column-revers;";
    //         weekDays.innerHTML += `<div class="weekdays" id='${i}'>${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
    //         if (firstDayinWeek > maxDays[newdate.getMonth()])  {
    //             firstDayinWeek = firstDayinWeek - firstDayinWeek;
    //         }
            
    //     }
    // });
    

}
dateChanges();

