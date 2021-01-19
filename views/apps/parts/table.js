
///////////
////////////// transpher value of inputs
///////////
function transferValue(){
    var formAPC = document.getElementById("formAPC"); // the whole form that pop up and pop down
    var itemCont = document.querySelector(".partet-time");
    var showTime = document.getElementById("change-size-h"); // dev that get time from table
    const time = document.getElementsByClassName(".parttimes");
    var dateAP = document.getElementsByClassName(".dateInput");
    

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
        var dateTaken = li.getAttribute("data-date");
        document.getElementById("dateAP").setAttribute("value", dateTaken);
        
        console.log(dateTaken.getDate)
        var chosendate = new Date(dateTaken);

        showTime.style.opacity = "1";
        showTime.innerHTML = `Your chosen time is:<br> <span id="hourmin">${chosendate.getFullYear()}/${chosendate.getMonth() + 1}/${chosendate.getDate()} <br> kl. ${li.value} </span>`;
        
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
    var firstDayinWeek =  todaysDay - today.getDay()+1;
    var newdate = new Date(today.getFullYear(), today.getMonth(), firstDayinWeek);
    var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    console.log(newdate);
    console.log(firstDayinWeek);
    console.log(maxDays[newdate.getMonth()]);
    
    // for (let i = 0; i <= 6; i++) {
    //     console.log(newdate);
    //     if (firstDayinWeek > maxDays[newdate.getMonth()])  {
    //         newdate.setDate(firstDayinWeek - maxDays[newdate.getMonth()] );  
    //         firstDayinWeek = 1;
    //         newdate.setMonth(newdate.getMonth()+1);
    //         console.log("if stat");
            
    //     }else if(firstDayinWeek <= 0){
            
    //         // newdate.setMonth(newdate.getMonth()+1);
    //         firstDayinWeek = newdate.getDate();
    //         console.log("if state")
    //     }
        
    //     newdate.setDate(firstDayinWeek++)
    //     weekDays.innerHTML += `<div class="weekdays" id='${i}'>${daysName[i]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]}</div>`;
    // }
 


    

}
dateChanges();

///////////
////////////// close form
///////////

function closeForm(){
    var formAPC = document.getElementById("formAPC"); // the whole form that pop up and pop down
    var btn = document.querySelector(".closeFormBtn");
    var selectedTime = document.querySelector(".selected");
    
    
    btn.addEventListener("click", ()=> {
        formAPC.style.display = "none";
        document.querySelector(".selected").style.opacity = "1"
    })
}

closeForm();

