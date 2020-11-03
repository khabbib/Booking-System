/*
/////////
/////////
/////////////     In Home Pop Up Subscribe Window      ///////////////////////////////////////////////
/////////
/////////
*/


const popUpWindow = document.getElementById("popUpWindow");
const closePopUpWindow = document.getElementById("subscribe-widget-panel-close-btn");
// Pop up after 5 sec
setTimeout(() => {
    popUpWindow.style.display ="flex";
}, 2000);
// close it
closePopUpWindow.addEventListener("click", ()=>{
    popUpWindow.style.display ="none";
})

