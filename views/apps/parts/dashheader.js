/*////////////// 
/*////////////// 
/*////////////// 
////////////// Open menu  ////////////////////////////////////////////////////////////*/ 
/*////////////// 
/*////////////// 
/*//////////////
*/


function opener(){
    var humbargerBtn = document.querySelector(".hamburger");
    var settingList = document.querySelector(".setting-list");
    var blkscn = document.getElementById("blackscreen");
    var toggleCounter = true;
    humbargerBtn.addEventListener("click", function(){
        if(toggleCounter == true){
            settingList.style.display = "flex";
            blkscn.style.display = "flex";
            toggleCounter = false;
        }else if(toggleCounter == false){
            settingList.style.display = "none";
            blkscn.style.display = "none";
            toggleCounter = true;
        }
    });
    window.addEventListener("mouseup", function(event){
        if(event.target != settingList || event.target.parentNode != settingList){
            settingList.style.display = "none";
            blkscn.style.display = "none";
            toggleCounter = true;
        }
    });
}

opener();