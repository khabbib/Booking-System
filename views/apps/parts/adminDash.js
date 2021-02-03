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
                userBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";
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
                dashBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";
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
                appnBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";
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
                adminBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";
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
                searchBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";
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
                chnageHBtn.style.cssText = "background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%); box-shadow: 0 0 120px #FF6A95; color: var(--whiteTableCC); transition: 0.2s;";

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



msgs = ()=> {
    setTimeout(() => {
        
    }, 2000);
    var btnClose = document.getElementsByClassName("btn-close-msg-admin");
    var msgContent = document.getElementsByClassName("each-msg");
    setTimeout(() => {
        for (let i = 0; i < msgContent.length; i++) {
            msgContent[i].style.cssText = "transform: translateX(0%); transition: 1s cubic-bezier(0.68, -0.25, 0.165, 2);";
            console.log("added class")
            
        }
    }, 2000);
    for (let i = 0; i < btnClose.length; i++) {
        btnClose[i].addEventListener("click", (e)=>{
            var target = e.currentTarget;
            console.log(target);
            if(target.className === "btn-close-msg-admin"){
                msgContent[i].style.cssText = "transform: translateX(300%); transition: 0.5s cubic-bezier(0.68, -0.85, 0.165, 2);";

                   
            }
            })
            
        }
    
}

msgs();

