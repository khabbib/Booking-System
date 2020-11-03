// table validation

function formValidation(){
    var name = document.getElementById("name");
    var lastname = document.getElementById("Lastname");
    var email = document.getElementById("email");
    var address = document.getElementById("Address");
    var postaddress = document.getElementById("postAdress");
    var number = document.getElementById("number");
    // 
    var form = document.getElementById("formAP");
    
    //errors
    var globaleError = document.getElementById("varning-msg");
    var nameE = document.getElementById("valName");
    var lastnameE = document.getElementById("valLast");
    var emailE = document.getElementById("valEmail");
    var addressE = document.getElementById("valPost");
    var postaddressE = document.getElementById("valAddress");
    var numberE = document.getElementById("valNumber");
    form.addEventListener('submit', (e) => {
        var msg = [];
        globaleError.style.opacity = "1";
        if(name.value === "" || name.value == null || lastname.value === "" || lastname.value == null || email.value === "" ||  email.value == null || address.value === "" ||  address.value == null){
            msg.push("Required feilds not filled!")
        }
        
        if ( email.value === "/!#-+`*") {
            msg.push("email is not valid")
            emailE.innerHTML +="Email is not valid!";
        }
       
        // if( address.value === "" ||  address.value == null){
        //     msg.push("ffasdf")
        //     addressE.innerHTML = "Address is required!"
        // }
        // if( postaddress.value === "" ||  postaddress.value == null){
        //     msg.push("ffas")
        //     postaddressE.innerHTML = "Post address is not filled!"
        // }
        // if( number.value === "" ||  number.value == null){
        //     msg.push("ffg")
        //     numberE.innerHTML = "Number is not filled"
        // }



        if(msg.length > 0){
            e.preventDefault();
            console.log("work")
            globaleError.innerText = msg.join(',')
            
        }
        
    });
}

formValidation();
