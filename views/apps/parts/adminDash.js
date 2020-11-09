
function deleter(){
    var rowForDelete = document.getElementsByClassName("each-appns"); // the row 

    for(let i = 0; i < rowForDelete.length; i++){
        console.log(i);
        var el = rowForDelete[i],
        
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        elClone.addEventListener("click", ()=>{
            if(document.getElementById("bool"+i).value == "false"){
                document.getElementById("bool"+i).value = "true";
                rowForDelete[i].style.cssText = "background: var(--whiteTableCC);";
                
            }else{
                
                document.getElementById("bool"+i).value = "false";
                rowForDelete[i].style.cssText = "background: var(--meddledblue);";
                
                
            }
        });
    };
}

deleter();