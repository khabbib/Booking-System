function adminEditInfo(){
    var editBtn = document.getElementById("edit-admin-info");
    var saveBtn = document.getElementById("save-admin-info");
    var cleBtn = document.getElementById("cle-edit-admin-info");
    var btns = document.querySelector(".btns-edits");
    var Inputs = document.querySelectorAll(".admin-info-input");
    
    editBtn.addEventListener("click", ()=> {
        saveBtn.style.display = "flex";
        editBtn.style.display = "none";
        cleBtn.style.display = "flex";
        btns.style.cssText = "padding-top: 2rem;";

        for (let i = 0; i < Inputs.length; i++) {
            Inputs[i].disabled = false
            Inputs[i].style.cssText = "color: var(--darkfont); background: var(--whiteTableCC);";
          
        }
        
    })
    
    cleBtn.addEventListener("click", ()=> {
        saveBtn.style.display = "none";
        editBtn.style.display = "flex";
        cleBtn.style.display = "none";
        btns.style.cssText = "padding-top: 1rem;";

        for (let i = 0; i < Inputs.length; i++) {
            Inputs[i].disabled = true
            Inputs[i].style.cssText = "color: var(--whiteTableCC); background: none; opacity: 0.3;";
            Inputs[i].value = Inputs[i].placeholder;
        }
    })
}
adminEditInfo()