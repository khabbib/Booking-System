function ss(){
    var dashMenu = document.getElementsByClassName("styled");
    var userPage = document.querySelector(".alluser");
    var appnPage = document.querySelector(".allappns");
    var dashPage = document.querySelector(".welcomeAdmin");
    var searchPage = document.querySelector(".searchMenu");
    var adminPage = document.querySelector(".alladmin");
    var addTimePage = document.querySelector(".add-time-container");
    //user panel
    var userBtn = document.querySelector(".users");
    //appointment panel
    var appnBtn = document.querySelector(".appns");
    var adminBtn = document.querySelector(".admins");
    var chnageHBtn = document.querySelector(".workhours");
    //dashboard panel
    var dashBtn = document.querySelector(".dashboardBtn");
    //dashboard panel
    var searchBtn = document.querySelector(".searchBtn");
    for (let i = 0; i < dashMenu.length; i++) {
        dashMenu[i].addEventListener("click", (e)=>{
            var target = e.currentTarget;
            if(target.innerHTML === "Users"){
                userBtn.style.cssText = "background: var(--lightblue);";
                appnBtn.style.cssText = "background: none;";
                dashBtn.style.cssText = "background: none;";
                adminBtn.style.cssText = "background: none;";
                searchBtn.style.cssText = "background: none;";
                chnageHBtn.style.cssText = "background: none;";
                
                appnPage.style.display = "none";
                dashPage.style.display = "none";
                adminPage.style.display = "none";
                searchPage.style.display = "none";
                userPage.style.display = "flex";
                addTimePage.style.display = "none";
            }
            if(target.innerHTML === "Dashboard"){
                userBtn.style.cssText = "background: none;";
                appnBtn.style.cssText = "background: none;";
                dashBtn.style.cssText = "background: var(--lightblue);";
                adminBtn.style.cssText = "background: none;";
                searchBtn.style.cssText = "background: none;";
                chnageHBtn.style.cssText = "background: none;";

                userPage.style.display = "none";
                appnPage.style.display = "none";
                adminPage.style.display = "none";
                dashPage.style.display = "flex";
                searchPage.style.display = "none";
                addTimePage.style.display = "none";

            }
            if(target.innerHTML === "Appointments"){
                userBtn.style.cssText = "background: none;";
                appnBtn.style.cssText = "background: var(--lightblue);";
                dashBtn.style.cssText = "background: none;";
                adminBtn.style.cssText = "background: none;";
                searchBtn.style.cssText = "background: none;";
                chnageHBtn.style.cssText = "background: none;";

                userPage.style.display = "none";
                appnPage.style.display = "flex";
                dashPage.style.display = "none";
                adminPage.style.display = "none";
                searchPage.style.display = "none";
                addTimePage.style.display = "none";

            }
            if(target.innerHTML === "Admins"){
                userBtn.style.cssText = "background: none;";
                appnBtn.style.cssText = "background: none;";
                dashBtn.style.cssText = "background: none;";
                adminBtn.style.cssText = "background: var(--lightblue);";
                searchBtn.style.cssText = "background: none;";
                chnageHBtn.style.cssText = "background: none;";

                userPage.style.display = "none";
                appnPage.style.display = "none";
                dashPage.style.display = "none";
                adminPage.style.display = "flex";
                searchPage.style.display = "none";
                addTimePage.style.display = "none";

            }
            console.log(target.innerHTML)
            if(target.innerHTML === '<i class="fas fa-search"></i>'){
                userBtn.style.cssText = "background: none;";
                appnBtn.style.cssText = "background: none;";
                dashBtn.style.cssText = "background: none;";
                adminBtn.style.cssText = "background: none;";
                searchBtn.style.cssText = "background: var(--lightblue);";
                chnageHBtn.style.cssText = "background: none;";

                userPage.style.display = "none";
                appnPage.style.display = "none";
                dashPage.style.display = "none";
                adminPage.style.display = "none";
                searchPage.style.display = "flex";
                addTimePage.style.display = "none";

            }
            if(target.innerHTML === 'Change Work Hours'){
                userBtn.style.cssText = "background: none;";
                appnBtn.style.cssText = "background: none;";
                dashBtn.style.cssText = "background: none;";
                adminBtn.style.cssText = "background: none;";
                searchBtn.style.cssText = "background: none;";
                chnageHBtn.style.cssText = "background: var(--lightblue);";

                userPage.style.display = "none";
                appnPage.style.display = "none";
                dashPage.style.display = "none";
                adminPage.style.display = "none";
                searchPage.style.display = "none";
                addTimePage.style.display = "flex";

            }
            
            
        })
        
    }
}
ss();

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
                rowForDelete[i].style.cssText = "background: var(--darkblue);";
                document.getElementById('adminDeleteBtn').style.display = "block";
            }else{
                
                document.getElementById('adminDeleteBtn').style.display = "none";
                document.getElementById("bool"+i).value = "false";
                rowForDelete[i].style.cssText = "background: var(--meddledblue);";
                
                
            }
        });
    };
}
deleter();

function deleterUser(){
    var rowForDelete = document.getElementsByClassName("each-list"); // the row 

    for(let i = 0; i < rowForDelete.length; i++){
        console.log(i);
        var el = rowForDelete[i],
        
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        elClone.addEventListener("click", ()=>{
            if(document.getElementById("boolu"+i).value == "false"){
                document.getElementById("boolu"+i).value = "true";
                rowForDelete[i].style.cssText = "background: var(--darkblue);";
                document.getElementById('adminDeleteUserBtn').style.display = "block";
            }else{
                
                document.getElementById('adminDeleteUserBtn').style.display = "none";
                document.getElementById("boolu"+i).value = "false";
                rowForDelete[i].style.cssText = "background: var(--meddledblue);";
                
                
            }
        });
    };
}
deleterUser();


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
            Inputs[i].style.cssText = "color: var(--whiteTableCC); background: none;";
            
        }
    })
}
adminEditInfo()

