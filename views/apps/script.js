/*////////////// 
/*////////////// 
/*////////////// 
////////////// validation of dashboard table  ////////////////////////////////////////////////////////////*/ 
/*////////////// 
/*////////////// 




/*//////////////
*/


function validatione (){
    var deleteBtn = document.getElementById("open-warning-btn-delete"); // delete botton
    var cancelBtn = document.getElementById("cancelDelete"); // delete botton
    var btnLinkAP = document.getElementById("btn-link-AP");
    var noAPavalible = document.getElementById("ifNoAP");
    var tableValidation = document.getElementById("existent");
    var newAPbtn = document.getElementById("btn-link-AP-s");
        if(tableValidation == null || tableValidation == ""){
            noAPavalible.style.display = "block";
            btnLinkAP.style.display = "block";
            newAPbtn.style.display = "none";
            deleteBtn.style.display = "none";
            
        }else{
            noAPavalible.style.display = "none";
            btnLinkAP.style.display = "none";
            newAPbtn.style.display = "block";
            deleteBtn.style.display = "block";
            
        }
}
validatione();

// sweet alert test




/*////////////// 
/*////////////// 
/*////////////// 
////////////// delete botton dashboard page  ////////////////////////////////////////////////////////////*/ 
/*////////////// 
/*////////////// 
/*//////////////
*/


function deleter(){
    var rowForDelete = document.getElementsByClassName("Rownm"); // the row 

    for(let i = 0; i < rowForDelete.length; i++){
        console.log(i);
        var el = rowForDelete[i],
        
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        elClone.addEventListener("click", ()=>{
            if(document.getElementById("bool"+i).value == "false"){
                document.getElementById("bool"+i).value = "true";
                rowForDelete[i].style.cssText = "background: var(--darkblue);";
                var openDelete = document.getElementById("open-warning-btn-delete");
                openDelete.addEventListener("click", ()=>{
                    document.querySelector(".warning-delete-ap").style.cssText = "display: flex;";
                });
            }else{
                
                document.getElementById("bool"+i).value = "false";
                rowForDelete[i].style.cssText = "background: var(--meddledblue);";
                
                
            }
        });
    };
}

deleter();


// warning panel in dashboard for delete

function warningDelete(){
    
    
    var closeWarningDelete = document.getElementById("cancelBtn");
    closeWarningDelete.addEventListener("click", ()=>{
        document.querySelector(".warning-delete-ap").style.cssText = "display: none;";

    });
}

warningDelete();